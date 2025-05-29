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
	await pool.execute(sql, [
		customer.id.replace(/\D/g, ''),
		customer.firstName,
		customer.lastName,
		customer.phone ?? '',
		customer.createdAt ? new Date(customer.createdAt) : null,
		customer.updatedAt ? new Date(customer.updatedAt) : null,
	]);
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
	await pool.execute(sql, [
		order.id.replace(/\D/g, ''),
		order.customer?.id ? order.customer.id.replace(/\D/g, '') : null,
		order.name,
		order.totalPriceSet?.shopMoney?.amount ?? 0,
		order.totalPriceSet?.shopMoney?.currencyCode ?? '',
		order.financialStatus ?? '',
		order.fulfillmentStatus ?? '',
		order.createdAt ? new Date(order.createdAt) : null,
		order.updatedAt ? new Date(order.updatedAt) : null,
		order.processedAt ? new Date(order.processedAt) : null,
	]);
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

	await pool.execute(sql, [
		orderId.replace(/\D/g, ''),
		lineItem.id.replace(/\D/g, ''),
		lineItem.productId ? lineItem.productId.replace(/\D/g, '') : null,
		lineItem.variantId ? lineItem.variantId.replace(/\D/g, '') : null,
		lineItem.title,
		lineItem.quantity,
		lineItem.originalUnitPriceSet?.shopMoney?.amount ?? 0,
		lineItem.sku ?? '',
		lineItem.vendor ?? '',
		lineItem.createdAt ? new Date(lineItem.createdAt) : null,
		lineItem.updatedAt ? new Date(lineItem.updatedAt) : null,
	]);
}
