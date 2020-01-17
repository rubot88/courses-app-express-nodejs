const { Router } = require('express');
const router = Router();
const Cart = require('../models/cart');
const Course = require('../models/course');

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id);
    await Cart.add(course);
    res.redirect('/cart');
});


router.get('/', async (req, res) => {
    const { courses, price } = await Cart.getAll();
    res.render('cart', {
        title: 'Cart',
        idCart: true,
        courses,
        totalPrice: price
    })
})
module.exports = router;