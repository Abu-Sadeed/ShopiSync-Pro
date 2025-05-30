export type Order = {
	id: string;
	name: string;
	customer: {
		email: string;
	};
	totalPriceSet: {
		shopMoney: {
			amount: number;
			currencyCode: string;
		};
	};
	createdAt: Date;
	updatedAt: Date;
};
export type OrderListResponse = {
	edges: {
		node: Order;
	}[];
};
