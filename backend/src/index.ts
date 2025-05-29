import dotenv from 'dotenv';
import express from 'express';
import shopifyOrderRoutes from './routes/shopifyOrderRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.json());

// order routes
app.use('/api', shopifyOrderRoutes);

// route for health check
app.get('/', (req, res) => {
	res.send('Shopify Sync Backend is running!');
});

// Start the server
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
