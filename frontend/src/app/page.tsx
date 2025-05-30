import OrdersTable from '../components/order/OrderTable';

export default function Home() {
	return (
		<main className="">
			<h1 className="text-2xl font-bold">Shopify Orders</h1>
			<OrdersTable />
		</main>
	);
}
