export type Order = {
	id: number;
	customer_id: number;
	order_number: string;
	total_price: string;
	currency: string;
	financial_status: string;
	fulfillment_status: string;
	created_at: string;
	updated_at: string | null;
	processed_at: string | null;
	customer_email: string;
	first_name: string;
	last_name: string;
};

export type OrderListResponse = {
	edges: {
		node: Order;
	}[];
};
