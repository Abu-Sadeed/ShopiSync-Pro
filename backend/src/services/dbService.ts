import pool from '../config/db';

export async function upsertCustomer(customer: any) {
	const sql = `
    INSERT INTO customers (id, email, first_name, last_name, phone, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        email = VALUES(email),
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        phone = VALUES(phone),
        created_at = VALUES(created_at),
        updated_at = VALUES(updated_at)
    `;
	try {
		const customerId = customer.id
			? customer.id.toString().replace(/\D/g, '')
			: null;

		if (!customerId) {
			console.warn('Customer upsert skipped: missing id:', customer);
			return;
		}

		await pool.execute(sql, [
			customerId,
			customer.email ?? null,
			customer.firstName ?? null,
			customer.lastName ?? null,
			customer.phone ?? null,
			customer.createdAt ? new Date(customer.createdAt) : null,
			customer.updatedAt ? new Date(customer.updatedAt) : null,
		]);
	} catch (err: any) {
		console.error(
			'Error in upsertCustomer:',
			err,
			'Customer data:',
			customer,
		);
	}
}

export async function upsertOrder(order: any) {
	const sql = `
        INSERT INTO orders (id, customer_id, order_number, total_price, currency, financial_status, fulfillment_status, created_at, updated_at, processed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        customer_id = VALUES(customer_id),
        order_number = VALUES(order_number),
        total_price = VALUES(total_price),
        currency = VALUES(currency),
        financial_status = VALUES(financial_status),
        fulfillment_status = VALUES(fulfillment_status),
        created_at = VALUES(created_at),
        updated_at = VALUES(updated_at),
        processed_at = VALUES(processed_at)
    `;
	try {
		const orderId = order.id
			? order.id.toString().replace(/\D/g, '')
			: null;
		if (!orderId) {
			console.warn('Order upsert skipped: missing id:', order);
			return;
		}
		const customerId = order.customer?.id
			? order.customer.id.toString().replace(/\D/g, '')
			: null;

		await pool.execute(sql, [
			orderId,
			customerId,
			order.name ?? null,
			order.totalPriceSet?.shopMoney?.amount ?? 0,
			order.totalPriceSet?.shopMoney?.currencyCode ?? null,
			order.financialStatus ?? null,
			order.fulfillmentStatus ?? null,
			order.createdAt ? new Date(order.createdAt) : null,
			order.updatedAt ? new Date(order.updatedAt) : null,
			order.processedAt ? new Date(order.processedAt) : null,
		]);
	} catch (err: any) {
		console.error('Error in upsertOrder:', err, 'Order data:', order);
	}
}

export async function upsertOrderLineItem(orderId: string, lineItem: any) {
	const sql = `
      INSERT INTO order_line_items (
        order_id,
        line_item_id,
        product_id,
        variant_id,
        title,
        quantity,
        price,
        sku,
        vendor,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        quantity = VALUES(quantity),
        price = VALUES(price),
        sku = VALUES(sku),
        vendor = VALUES(vendor),
        created_at = VALUES(created_at),
        updated_at = VALUES(updated_at)
    `;

	try {
		const safeOrderId = orderId
			? orderId.toString().replace(/\D/g, '')
			: null;
		const lineItemId = lineItem.id
			? lineItem.id.toString().replace(/\D/g, '')
			: null;
		const productId = lineItem.productId
			? lineItem.productId.toString().replace(/\D/g, '')
			: null;
		const variantId = lineItem.variantId
			? lineItem.variantId.toString().replace(/\D/g, '')
			: null;

		if (!safeOrderId || !lineItemId) {
			console.warn('Line item upsert skipped: missing IDs:', {
				orderId,
				lineItemId,
				lineItem,
			});
			return;
		}

		await pool.execute(sql, [
			safeOrderId,
			lineItemId,
			productId,
			variantId,
			lineItem.title ?? null,
			lineItem.quantity ?? null,
			lineItem.originalUnitPriceSet?.shopMoney?.amount ?? 0,
			lineItem.sku ?? null,
			lineItem.vendor ?? null,
			lineItem.createdAt ? new Date(lineItem.createdAt) : null,
			lineItem.updatedAt ? new Date(lineItem.updatedAt) : null,
		]);
	} catch (err: any) {
		console.error('Error in upsertOrderLineItem:', err, 'Data:', lineItem);
	}
}
