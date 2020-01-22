const { Router } = require('express');
const router = Router();
const Course = require('../models/course');


// helper functions
const mapCartToCourses = (cart) => {

    return cart
        .items
        .map(item => ({
            ...item.courseId._doc,
            count: item.count
        }));
};

const computePrice = (courses) => courses.reduce((sum, { price, count }) => sum += price * count, 0);


// get cart
router.get('/', async (req, res) => {
    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate();

    const courses = mapCartToCourses(user.cart);

    res.render('cart', {
        title: 'Cart',
        isCart: true,
        courses,
        totalPrice: computePrice(courses)
    })
});

// add course to cart
router.get('/add/:id', async (req, res) => {
    await req.user.addToCart(req.params.id);
    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate();

    const courses = mapCartToCourses(user.cart);

    const cart = {
        courses,
        totalPrice: computePrice(courses)
    };
    res.status(200).json(cart);
});

// remove course form cart
router.delete('/remove/:id', async (req, res) => {
    await req.user.removeFromCart(req.params.id);
    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate();

    const courses = mapCartToCourses(user.cart);

    const cart = {
        courses,
        totalPrice: computePrice(courses)
    };

    res.status(200).json(cart);
}
);
router.get('/increase/:id', async (req, res) => {
    const cart = await Cart.increase(req.params.id);
    res.status(200).json(cart);
}
);

module.exports = router;