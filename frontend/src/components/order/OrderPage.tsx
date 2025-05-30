'use client';

import {useParams, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {getOrder} from '../../services/api';
import {Order} from '../../types/order';
import {Card, CardContent} from '../ui/card';

const OrdersPage = () => {
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [loading, setLoading] = useState(true);
	const params = useParams();
	const router = useRouter();

	useEffect(() => {
		getOrder((params.orderId as string) ?? '')
			.then((data) => setSelectedOrder(data))
			.catch(console.error)
			.finally(() => setLoading(false));
	}, [params]);

	if (loading) {
		return (
			<Card>
				<CardContent className="p-4 text-gray-500">
					Loading order details...
				</CardContent>
			</Card>
		);
	}

	if (!selectedOrder) {
		return (
			<Card>
				<CardContent className="p-4 text-red-500">
					Order not found.
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-2xl mx-auto mt-4">
			<CardContent className="space-y-2 p-4">
				<button
					onClick={() => router.push('/')}
					className="w-full border shadow ">
					Back
				</button>
				<div className="text-xl font-semibold">
					Order #{selectedOrder.id}
				</div>
				<div>
					<strong>Customer:</strong> {selectedOrder.customer_email}
				</div>
				<div>
					<strong>Total:</strong> {selectedOrder.total_price}{' '}
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
	);
};

export default OrdersPage;
