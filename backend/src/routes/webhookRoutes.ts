import crypto from 'crypto';
import express, {Router} from 'express';
import {
	upsertCustomer,
	upsertOrder,
	upsertOrderLineItem,
} from '../services/dbService';

const router = Router();

function verifyShopifyWebhook(req: any, buf: Buffer) {
	const hmacHeader = req.get('x-shopify-hmac-sha256');
	const generatedHmac = crypto
		.createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET!)
		.update(buf)
		.digest('base64');
	console.log('HMAC header:', hmacHeader);
	console.log('Generated HMAC:', generatedHmac);
	if (generatedHmac !== hmacHeader) {
		throw new Error('Webhook HMAC verification failed!');
	}
}

router.post(
	'/shopify/webhook/order',
	express.raw({type: 'application/json'}),
	async (req, res) => {
		try {
			verifyShopifyWebhook(req, req.body);

			const topic = req.get('x-shopify-topic');
			const orderData = JSON.parse(req.body.toString('utf8'));
			console.log(
				`Webhook received: ${topic} for order ${
					orderData.id ?? orderData.name
				}`,
			);

			if (orderData.customer) {
				await upsertCustomer(orderData.customer);
			}

			await upsertOrder(orderData);

			if (Array.isArray(orderData.line_items)) {
				for (const lineItem of orderData.line_items) {
					await upsertOrderLineItem(orderData.id, lineItem);
				}
			}

			res.status(200).send('Webhook processed');
		} catch (err: any) {
			console.error('Webhook failed:', err.message);
			res.status(401).send('Webhook HMAC verification failed');
		}
	},
);

export default router;
