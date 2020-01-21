const { Router } = require('express');
const router = Router();
const Course = require('../models/course');

const mapCartToCourses = (cart) => cart
    .items
    .map(item => ({
        ...item.courseId._doc,
        count: item.count
    }));

const computePrice = (courses) => courses.reduce((sum, { price, count }) => sum += price * count, 0);

router.get('/add/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    await req.user.addToCart(course);
    res.status(200).json(course);
});


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