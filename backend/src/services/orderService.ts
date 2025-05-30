export async function fetchOrders(
	limit: number,
	offset: number,
	search = '',
	sort = '',
) {
	const queryParams = new URLSearchParams({
		limit: String(limit),
		offset: String(offset),
		search,
		sort,
	}).toString();

	const response = await fetch(
		`http://localhost:4000/api/shopify-orders?${queryParams}`,
	);

	if (!response.ok) {
		throw new Error('Failed to fetch orders');
	}

	const data = await response.json();
	return data;
}
