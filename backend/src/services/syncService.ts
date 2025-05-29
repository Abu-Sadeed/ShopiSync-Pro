import {upsertCustomer, upsertOrder, upsertOrderLineItem} from './dbService';
import {fetchAllLineItemsForOrder} from './shopifyLineItemService';
import {fetchAllShopifyOrders} from './shopifyOrderService';

export async function syncAllOrders() {
	let hasNextPage = true;
	let endCursor: string | undefined = undefined;
	let totalOrders = 0;

	while (hasNextPage) {
		try {
			const orders = await fetchAllShopifyOrders();

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

			console.log(`Synced batch. Total orders processed: ${totalOrders}`);
		} catch (err: any) {
			console.error('Sync failed:', err.message);

			break;
		}
	}
	console.log(`Sync completed. Total orders: ${totalOrders}`);
}

async function handleRateLimit() {
	await new Promise((res) => setTimeout(res, 1000));
}
