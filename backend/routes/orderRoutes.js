const express = require('express');
const Order = require('../models/order'); // Ensure this path correctly points to your Order model
const router = express.Router();

// POST route to create a new order
router.post('/order', async (req, res) => {
    console.log("Received request to create order");

    // Optionally add data validation here
    if (!req.body.userId || !req.body.items || !req.body.total) {
        return res.status(400).json({ message: 'Missing required order fields' });
    }

    try {
        const newOrder = new Order({
            userId: req.body.userId, // Make sure 'user' matches the userId sent
            items: req.body.items.map(item => ({
                product: item.product, // Ensure 'product' is present in each item
                quantity: item.quantity,
                price: item.price
            })),
            total: req.body.total,
            address: req.body.address, 
            orderNumber: req.body.orderNumber
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Failed to create new order:', error);
        res.status(500).json({ message: 'Failed to create order', error: error.toString() });
    }
});


// Additional routes can be added here

module.exports = router;
