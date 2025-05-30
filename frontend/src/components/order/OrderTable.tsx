'use client';
import {Card, CardContent} from '@/components/ui/card';

import {useEffect, useState} from 'react';
import {Order} from '../../types/order';

import {getOrders} from '../../services/api';
import {DataTable} from './data-table';
import {orderColumns} from './OrderColumn';

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
					columns={orderColumns}
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
								{selectedOrder.customer.email}{' '}
							</div>
							<div>
								<strong>Total:</strong>{' '}
								{selectedOrder.totalPriceSet.shopMoney.amount}{' '}
								{
									selectedOrder.totalPriceSet.shopMoney
										.currencyCode
								}
							</div>
							<div>
								<strong>Created:</strong>{' '}
								{selectedOrder.createdAt.toLocaleDateString()}{' '}
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
