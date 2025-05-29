import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST || 'localhost',
	port: Number(process.env.MYSQL_PORT) || 3306,
	user: process.env.MYSQL_USER || 'shopify_user',
	password: process.env.MYSQL_PASSWORD || 'shopifypassword',
	database: process.env.MYSQL_DATABASE || 'shopify_orders',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

export default pool;
