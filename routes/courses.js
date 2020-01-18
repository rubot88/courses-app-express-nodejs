const { Router } = require('express');
const router = Router();
const Course = require('../models/course');
const Cart = require('../models/cart')

router.get('/', async (req, res) => {
    const courses = await Course.getAll();
    res.render('courses', {
        title: 'Courses page',
        isCourses: true,
        courses
    });
});

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allowed) {
        return res.redirect('/');
    }
    const course = await Course.getById(req.params.id)
    res.render('course-edit', {
        title: `Edit ${course.title}`,
        course
    })
});

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id);
    res.render('course', {
        layout: 'empty',
        title: `Course : ${course.title}`,
        course
    });
});

router.post('/edit', async (req, res) => {
    const course = req.body;

    await Course.update(req.body);

    // update cart
    const cart = await Cart.getAll();
    const courses = cart.courses.map(c => {
        if (c.id === course.id) {
            return {
                ...c,
                title: course.title,
                price: course.price,
                img: course.img
            };
        }
        return c;
    });

    const price = courses.reduce((sum, c) => c.price * c.count + sum, 0);

    const newCart = {
        courses,
        price
    };
    
    await Cart.update(newCart);

    res.redirect('/courses');
});



module.exports = router;