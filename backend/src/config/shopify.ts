import dotenv from 'dotenv';
import Shopify from 'shopify-api-node';
dotenv.config();

if (!process.env.SHOPIFY_SHOP || !process.env.SHOPIFY_ACCESS_TOKEN) {
	throw new Error(
		'Missing Shopify credentials! Check SHOPIFY_SHOP and SHOPIFY_ACCESS_TOKEN in your .env file.',
	);
}

const shopify = new Shopify({
	shopName: process.env.SHOPIFY_SHOP,
	accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
});

export default shopify;
