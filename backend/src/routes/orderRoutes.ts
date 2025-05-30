import {Router} from 'express';
import {fetchOrders} from '../services/orderService';

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
