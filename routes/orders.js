const { Router } = require('express');
const router = Router();

const Order = required('../models/order.js');

router.get('/', async (req, res) => {
    res.render('orders', {
        title: 'Orders',
        isOrder: true
    })
});

router.post('/', async (req, res) => {
    
    res.redirect('orders');
});


module.exports = router;