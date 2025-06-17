// Interacción con la tabla pedidos

const db = require('../config/db');

// Crea un pedido y devuelvo su ID
async function createOrder(userId, addressId, total) {
    const [result] = await db.query(
        `INSERT INTO pedidos (usuario_id, direccion_envio_id, total)
         VALUES (?, ?, ?)`,
        [userId, addressId, total]
    );
    return result.insertId;
}

// Obtiene todos los pedidos de un usuario
async function getOrdersByUser(userId) {
    const [rows] = await db.query(
        `SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY fecha DESC`,
        [userId]
    );
    return rows;
}

// Obtiene un pedido por su ID
async function getOrderById(orderId) {
    const [rows] = await db.query(
        `SELECT * FROM pedidos WHERE id = ?`,
        [orderId]
    );
    return rows[0];
}

// Obtiene todos los pedidos (para admin)
async function getAllOrders() {
    const [rows] = await db.query(
        `SELECT * FROM pedidos ORDER BY fecha DESC`
    );
    return rows;
}

// Actualiza el estado de un pedido (solo admin)
async function updateOrderStatus(orderId, status) {
    await db.query(
        `UPDATE pedidos SET estado = ? WHERE id = ?`,
        [status, orderId]
    );
}

module.exports = {
    createOrder,
    getOrdersByUser,
    getOrderById,
    getAllOrders,
    updateOrderStatus
};
