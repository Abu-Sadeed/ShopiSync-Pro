import shopify from '../config/shopify';

const LINE_ITEMS_QUERY = (orderId: string, first: number, after?: string) => `
{
  order(id: "${orderId}") {
    lineItems(first: ${first}${after ? `, after: "${after}"` : ''}) {
      edges {
        node {
          id
          title
          quantity
          originalUnitPriceSet { shopMoney { amount currencyCode } }
          discountedUnitPriceSet { shopMoney { amount currencyCode } }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;

export async function fetchAllLineItemsForOrder(
	orderId: string,
	batchSize = 50,
) {
	let allLineItems: any[] = [];
	let hasNextPage = true;
	let endCursor: string | undefined = undefined;

	while (hasNextPage) {
		try {
			const response = await shopify.graphql(
				LINE_ITEMS_QUERY(orderId, batchSize, endCursor),
			);
			const edges = response.order.lineItems.edges;
			allLineItems.push(...edges.map((edge: any) => edge.node));
			hasNextPage = response.order.lineItems.pageInfo.hasNextPage;
			endCursor = response.order.lineItems.pageInfo.endCursor;
		} catch (error: any) {
			console.error(
				`Error fetching line items for order ${orderId}:`,
				error.message,
			);
			throw error;
		}
	}

	return allLineItems;
}
