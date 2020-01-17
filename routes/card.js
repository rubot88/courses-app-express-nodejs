const { Router } = require('express');
const router = Router();
const Card = require('../models/card');
const Course = require('../models/course');

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id);
    await Card.add(course);
    res.redirect('/card');
});


router.get('/', async (req, res) => {
    const { courses, price } = await Card.getAll();
    res.render('card', {
        title: 'Card',
        idCard: true,
        courses,
        totalPrice: price
    })
})
module.exports = router;