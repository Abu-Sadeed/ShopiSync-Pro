'use client';
import {Card, CardContent} from '@/components/ui/card';

import {useEffect, useState} from 'react';
import {Order} from '../../types/order';

import {getOrders} from '../../services/api';
import {DataTable} from './data-table';
import {orderColumnDefs} from './OrderColumn';

export default function OrdersTable() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getOrders()
			.then((data) => setOrders(data.orders))
			.catch(console.error)
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div>
				<DataTable
					columns={orderColumnDefs}
					data={orders}
					setSelectedOrder={setSelectedOrder}
				/>
			</div>
			<div>
				{selectedOrder ? (
					<Card>
						<CardContent className="space-y-2 p-4">
							<div className="text-xl font-semibold">
								Order #{selectedOrder.id}
							</div>
							<div>
								<strong>Customer:</strong>{' '}
								{selectedOrder.customer_email}
							</div>
							<div>
								<strong>Total:</strong>{' '}
								{selectedOrder.total_price}{' '}
								{selectedOrder.currency}
							</div>
							<div>
								<strong>Financial Status:</strong>{' '}
								{selectedOrder.financial_status}
							</div>
							<div>
								<strong>Fulfillment Status:</strong>{' '}
								{selectedOrder.fulfillment_status}
							</div>
						</CardContent>
					</Card>
				) : (
					<Card>
						<CardContent className="p-4 text-gray-500">
							Select an order to see details.
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
