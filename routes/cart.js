const { Router } = require('express');
const router = Router();
const Cart = require('../models/cart');
const Course = require('../models/course');

router.get('/add/:id', async (req, res) => {
    console.log(req.params.id);
    const course = await Course.getById(req.params.id);
    await Cart.add(course);
    res.status(200).json(course);
});


router.get('/', async (req, res) => {
    const { courses, price } = await Cart.getAll();
    
    res.render('cart', {
        title: 'Cart',
        isCart: true,
        courses,
        totalPrice: price
    })
});

router.delete('/remove/:id', async (req, res) => {
    const cart = await Cart.remove(req.params.id);
    res.status(200).json(cart);
}
);
router.get('/increase/:id', async (req, res) => {
    const cart = await Cart.increase(req.params.id);    
    res.status(200).json(cart);
}
);

module.exports = router;