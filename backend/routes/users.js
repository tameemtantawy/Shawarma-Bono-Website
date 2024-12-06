const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Ensure this path is correct
const router = express.Router();

// Middleware for authentication
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
};

// Registration endpoint
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    console.log("Login route hit");

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).send("Authentication failed");
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, userId: user._id }); // Send userId in the response
    } catch (error) {
        res.status(500).send("Error during authentication");
    }
});

// Fetch user details endpoint
router.get('/user/:userId', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send('Error fetching user');
    }
});

// Update user's address endpoint
router.post('/update-address', authenticate, async (req, res) => {
    try {
        const { userId, address } = req.body;
        const user = await User.findByIdAndUpdate(
            userId, 
            { address: address }, 
            { new: true, select: '-password' }
        );

        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating address', error: error.message });
    }
});
router.post('/create-payment-intent', async (req, res) => {
    const { email, amount } = req.body;

    try {
        // Create or retrieve a customer in Stripe
        const customer = await stripe.customers.create({ email });

        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            customer: customer.id,
            amount,
            currency: 'usd',
            // Additional settings
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
