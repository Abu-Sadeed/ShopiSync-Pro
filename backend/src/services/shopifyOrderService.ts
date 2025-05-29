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
