'use client';

import {useEffect, useState} from 'react';
import {Order} from '../../types/order';

import {getOrders} from '../../services/api';
import {DataTable} from './data-table';
import {orderColumnDefs} from './OrderColumn';

export default function OrdersTable() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getOrders()
			.then((data) => setOrders(data.orders))
			.catch(console.error)
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="flex size-full flex-col items-center justify-center p-4">
			<div>
				<DataTable columns={orderColumnDefs} data={orders} />
			</div>
		</div>
	);
}
