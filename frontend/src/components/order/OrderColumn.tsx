import {ColumnDef} from '@tanstack/react-table';
import {Order} from '../../types/order';

export const orderColumns: ColumnDef<Order>[] = [
	{
		accessorKey: 'order_number',
		header: 'Order #',
	},
	{
		accessorKey: 'customer_email',
		header: 'Customer Email',
	},
	{
		accessorKey: 'total_price',
		header: 'Total',
		cell: ({row}) => (
			<span>
				{JSON.stringify(row.original.totalPriceSet)}{' '}
				{row.original.totalPriceSet?.shopMoney?.currencyCode}
			</span>
		),
	},
	{
		accessorKey: 'created_at',
		header: 'Created At',
	},
];
