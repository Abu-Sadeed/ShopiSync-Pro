import crypto from 'crypto';
import express, {Router} from 'express';

const router = Router();

function verifyShopifyWebhook(req: any, res: any, buf: Buffer) {
	const hmacHeader = req.get('x-shopify-hmac-sha256');
	const generatedHmac = crypto
		.createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET!)
		.update(buf.toString('utf8'))
		.digest('base64');
	if (generatedHmac !== hmacHeader) {
		throw new Error('Webhook HMAC verification failed!');
	}
}

router.post(
	'/shopify/webhook/order',
	express.raw({type: 'application/json'}),
	(req, res) => {
		try {
			verifyShopifyWebhook(req, res, req.body);

			const orderData = JSON.parse(req.body.toString('utf8'));
			// TODO: upsert customer, order, line items as before

			res.status(200).send('Webhook processed');
		} catch (err: any) {
			console.error('Webhook failed:', err.message);
			res.status(401).send('Webhook HMAC verification failed');
		}
	},
);

export default router;
