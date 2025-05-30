'use client';
import {useEffect, useState} from 'react';
import {getOrders} from '../../services/api';
import {Order} from '../../types/order';

export default function OrdersTable() {
	const [orders, setOrders] = useState<Order[]>([]);
	useEffect(() => {
		getOrders().then((data) =>
			setOrders(data.edges.map((e: {node: Order}) => e.node)),
		);
	}, []);

	return (
		<table className="min-w-full border">
			<thead>
				<tr>
					<th className="p-2 border">Order ID</th>
					<th className="p-2 border">Name</th>
					<th className="p-2 border">Customer</th>
					<th className="p-2 border">Total</th>
				</tr>
			</thead>
			<tbody>
				{orders.map((order) => (
					<tr key={order.id}>
						<td className="p-2 border">{order.id}</td>
						<td className="p-2 border">{order.name}</td>
						<td className="p-2 border">{order.customer?.email}</td>
						<td className="p-2 border">
							{order.totalPriceSet?.shopMoney?.amount}{' '}
							{order.totalPriceSet?.shopMoney?.currencyCode}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
