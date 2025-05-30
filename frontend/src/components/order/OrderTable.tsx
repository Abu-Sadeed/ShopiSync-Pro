'use client';

import {useEffect, useState} from 'react';
import {Order} from '../../types/order';

import {getOrders} from '../../services/api';
import PaginationComponent from '../PaginationComponent';
import {DataTable} from './data-table';
import {orderColumnDefs} from './OrderColumn';

export default function OrdersTable() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		getOrders({page, pageSize})
			.then((data) => {
				setOrders(data.orders);
				setTotal(data.total);
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	}, [page, pageSize]);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="flex size-full flex-col items-center justify-center p-4">
			<div>
				<DataTable columns={orderColumnDefs} data={orders} />
			</div>
			<PaginationComponent
				pagesize={pageSize}
				onPageSizeChange={(newSize) => {
					setPageSize(newSize);
					setPage(1); // Reset to page 1 when page size changes
				}}
				currentPage={page}
				onPageChange={(newPage) => setPage(newPage)}
				totalPages={Math.ceil(total / pageSize)}
			/>
		</div>
	);
}
