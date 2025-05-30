export async function getOrders() {
	try {
		const res = await fetch('http://localhost:4000/api/shopify-orders');
		console.log('Fetching orders:', res);
		if (!res.ok) throw new Error('Failed to fetch orders');
		return res.json();
	} catch (error: unknown) {
		console.error('Error fetching orders:', error);
		throw error;
	}
}
