import shopify from '../config/shopify';

const ORDERS_QUERY = (first: number, after?: string) => `
{
    orders(first: ${first}${after ? `, after: "${after}"` : ''}) {
        edges {
            node {
                    id
                    name
                    createdAt
                    customer { id, firstName, lastName, email }
                    totalPriceSet { shopMoney { amount currencyCode } }
                    
            }
        }
    pageInfo {
        hasNextPage
        endCursor
    }
    }
}
`;

export async function fetchShopifyOrdersPaginated(
	first: number,
	after?: string,
) {
	try {
		const response = await shopify.graphql(ORDERS_QUERY(first, after));
		return response.orders;
	} catch (error: any) {
		console.error('Error fetching paginated orders:', error.message);
		throw error;
	}
}

export async function fetchAllShopifyOrders() {
	let hasNextPage = true;
	let endCursor: string | undefined = undefined;
	const allOrders: any[] = [];

	while (hasNextPage) {
		try {
			const response = await fetchShopifyOrdersPaginated(50, endCursor);
			const orders = response.edges.map((edge: any) => edge.node);

			allOrders.push(...orders);

			hasNextPage = response.pageInfo.hasNextPage;
			endCursor = response.pageInfo.endCursor;

			console.log(`Fetched batch of ${orders.length} orders.`);
		} catch (error: any) {
			console.error('Error fetching all orders:', error.message);
			throw error;
		}
	}

	console.log(`Total orders fetched: ${allOrders.length}`);
	return allOrders;
}
