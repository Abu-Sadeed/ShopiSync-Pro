import dotenv from 'dotenv';
import express from 'express';
import pool from './config/db';
import shopifyOrderRoutes from './routes/shopifyOrderRoutes';
import webhookRoutes from './routes/webhookRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.json());

app.use('/api', shopifyOrderRoutes);
app.use('/api', webhookRoutes);
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
	})
	.catch((err) => {
		console.error('Failed to connect to MySQL:', err.message);
		process.exit(1);
	});
