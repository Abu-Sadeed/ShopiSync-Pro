export async function getOrders({
	page = 1,
	pageSize = 10,
	search = '',
	sort = '',
}: {
	page?: number;
	pageSize?: number;
	search?: string;
	sort?: string;
} = {}) {
	const params = new URLSearchParams({
		page: String(page),
		limit: String(pageSize),
		search,
		sort,
	});
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders?${params}`,
		{cache: 'no-store'},
	);
	if (!res.ok) throw new Error('Failed to fetch orders');
	return res.json();
}

export async function getOrder(orderId: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${orderId}`,
		{cache: 'no-store'},
	);
	if (!res.ok) throw new Error('Order not found');
	return res.json();
}
