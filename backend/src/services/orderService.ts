import pool from '../config/db';

export async function fetchOrders(
	limit: number,
	offset: number,
	search = '',
	sort = '',
) {
	const allowedSort = [
		'created_at',
		'order_number',
		'total_price',
		'customer_id',
	];
	let orderBy = 'o.created_at DESC';
	if (sort && allowedSort.includes(sort.split(' ')[0])) {
		orderBy = `o.${sort}`;
	}
	let where = '';
	let params: any[] = [];
	if (search) {
		where = `WHERE o.order_number LIKE ? OR c.email LIKE ?`;
		params.push(`%${search}%`, `%${search}%`);
	}

	try {
		const [orders]: any = await pool.query(
			`
            SELECT o.*, c.email AS customer_email, c.first_name, c.last_name
            FROM orders o
            LEFT JOIN customers c ON o.customer_id = c.id
            ${where}
            ORDER BY ${orderBy}
            LIMIT ? OFFSET ?
            `,
			[...params, limit, offset],
		);

		const [[{total}]]: any = await pool.query(
			`
            SELECT COUNT(*) as total
            FROM orders o
            LEFT JOIN customers c ON o.customer_id = c.id
            ${where}
            `,
			params,
		);

		return {
			orders,
			total,
			page: offset / limit + 1,
			limit,
		};
	} catch (err: any) {
		console.error('Error fetching orders:', err.message);
		throw err;
	}
}

export async function fetchSingleOrder(orderId: string) {
	if (!/^\d+$/.test(orderId)) return null;

	try {
		const [[order]]: any = await pool.query(
			`
      SELECT o.*, c.email AS customer_email, c.first_name, c.last_name
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      WHERE o.id = ?
      `,
			[orderId],
		);

		if (!order) return null;

		const [lineItems]: any = await pool.query(
			`SELECT * FROM order_line_items WHERE order_id = ?`,
			[orderId],
		);

		return {
			...order,
			line_items: lineItems,
		};
	} catch (err: any) {
		console.error('Error fetching single order:', err.message);
		throw err;
	}
}
