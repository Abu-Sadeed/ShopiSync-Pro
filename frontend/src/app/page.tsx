import OrdersTable from '../components/order/OrderTable';

export default function Home() {
	return (
		<main className="size-full flex flex-col items-center justify-center p-4">
			<h1 className="text-2xl font-bold">Shopify Orders</h1>
			<OrdersTable />
		</main>
	);
}
