import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import pool from './config/db';
import orderRoutes from './routes/orderRoutes';
import shopifyOrderRoutes from './routes/shopifyOrderRoutes';
import webhookRoutes from './routes/webhookRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 4000;
app.use(cors());
app.use((err: any, req: any, res: any, next: any) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong!');
});

app.use('/api', webhookRoutes);
app.use(express.json());

app.use('/api', shopifyOrderRoutes);
app.use('/api', orderRoutes);

app.get('/', (req, res) => {
	res.send('Shopify Sync Backend is running!');
});

pool.getConnection()
	.then((conn) => {
		console.log('MySQL connected');
		conn.release();
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});

		// Background task to sync orders on initial startup
		// syncAllOrdersBatchByBatch()
		// 	.then(() => {
		// 		console.log('Initial order sync completed successfully');
		// 	})
		// 	.catch((err) => {
		// 		console.error('Error during initial order sync:', err.message);
		// 	});
	})
	.catch((err) => {
		console.error('Failed to connect to MySQL:', err.message);
		process.exit(1);
	});
