import pool from '../config/db';
import {syncAllOrders} from '../services/syncService';

// Run the script
syncAllOrders()
	.then(() => {
		console.log('All done!');
		pool.end();
		process.exit(0);
	})
	.catch((err) => {
		console.error('Sync error:', err);
		pool.end();
		process.exit(1);
	});
