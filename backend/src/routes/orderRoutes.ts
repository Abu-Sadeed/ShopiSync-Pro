import {Router} from 'express';
import {fetchOrders, fetchSingleOrder} from '../services/orderService';

const router = Router();

router.get('/orders', async (req, res) => {
	const {limit = 10, page = 1, search = '', sort = ''} = req.query;
	const offset = (Number(page) - 1) * Number(limit);
	try {
		const orders = await fetchOrders(
			limit as number,
			offset,
			search as string,
			sort as string,
		);
		res.json(orders);
	} catch (err: any) {
		res.status(500).json({error: err.message});
	}
});

router.get('/orders/:orderId', async (req, res): Promise<any> => {
	const {orderId} = req.params;
	try {
		const orderDetails = await fetchSingleOrder(orderId);
		if (!orderDetails) {
			return res.status(404).json({error: 'Order not found'});
		}

		res.json(orderDetails);
	} catch (err: any) {
		res.status(500).json({error: err.message});
	}
});

export default router;
