import {Router} from 'express';
import {fetchShopifyOrdersPaginated} from '../services/shopifyOrderService';
import {syncAllOrdersBatchByBatch} from '../services/syncService';

const router = Router();

router.get('/shopify-orders', async (req, res) => {
	const {first = 5, after} = req.query;
	try {
		const orders = await fetchShopifyOrdersPaginated(
			Number(first),
			after as string | undefined,
		);
		res.json(orders);
	} catch (err: any) {
		res.status(500).json({error: err.message});
	}
});

router.post('/sync-orders', async (req, res) => {
	try {
		await syncAllOrdersBatchByBatch();
		res.status(200).json({message: 'Shopify sync completed!'});
	} catch (err: any) {
		console.error('Sync error:', err);
		res.status(500).json({error: err.message});
	}
});

export default router;
