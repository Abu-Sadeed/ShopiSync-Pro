import {
	upsertCustomer,
	upsertOrder,
	upsertOrderLineItem,
} from '../services/dbService';
import {fetchAllLineItemsForOrder} from '../services/shopifyLineItemService';
import {fetchShopifyOrdersPaginated} from '../services/shopifyOrderService';

export async function syncAllOrdersBatchByBatch() {
	let hasNextPage = true;
	let endCursor: string | undefined = undefined;
	let totalOrders = 0;

	while (hasNextPage) {
		try {
			const {edges, pageInfo} = await fetchShopifyOrdersPaginated(
				50,
				endCursor,
			);
			const orders = edges.map((edge: any) => edge.node);
			console.log(`Fetched ${orders.length} orders from Shopify`);
			for (const order of orders) {
				if (!order.id || !order.customer) {
					console.warn(
						`Skipping order (missing id/customer):`,
						order,
					);
					continue;
				}

				await upsertCustomer(order.customer);
				await upsertOrder(order);

				const lineItems = await fetchAllLineItemsForOrder(order.id);
				for (const item of lineItems) {
					await upsertOrderLineItem(order.id, item);
				}
				totalOrders++;
				await handleRateLimit();
			}

			hasNextPage = pageInfo.hasNextPage;
			endCursor = pageInfo.endCursor;

			console.log(
				`Processed batch. Total orders processed so far: ${totalOrders}`,
			);
		} catch (err: any) {
			console.error('Sync failed:', err.message);
			break;
		}
	}

	console.log(`Sync completed. Total orders processed: ${totalOrders}`);
}

async function handleRateLimit() {
	await new Promise((res) => setTimeout(res, 1000));
}
