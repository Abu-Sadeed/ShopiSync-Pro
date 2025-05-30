import {ColumnDef} from '@tanstack/react-table';
import {Order} from '../../types/order';

const orderColumnDefs: ColumnDef<Order>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'order_number',
		header: 'Order #',
	},
	{
		accessorKey: 'customer_id',
		header: 'Customer ID',
	},
	{
		accessorKey: 'total_price',
		header: 'Total Price',
	},
	{
		accessorKey: 'currency',
		header: 'Currency',
	},
	{
		accessorKey: 'financial_status',
		header: 'Financial Status',
	},
	{
		accessorKey: 'fulfillment_status',
		header: 'Fulfillment Status',
	},
	{
		accessorKey: 'created_at',
		header: 'Created At',
	},
	{
		accessorKey: 'updated_at',
		header: 'Updated At',
	},
	{
		accessorKey: 'processed_at',
		header: 'Processed At',
	},
	{
		accessorKey: 'customer_email',
		header: 'Customer Email',
	},
	{
		accessorKey: 'first_name',
		header: 'First Name',
	},
	{
		accessorKey: 'last_name',
		header: 'Last Name',
	},
];

export {orderColumnDefs};
