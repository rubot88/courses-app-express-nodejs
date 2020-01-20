const { Router } = require('express');
const router = Router();
const Course = require('../models/course');
const Cart = require('../models/cart')

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('courses', {
            title: 'Courses page',
            isCourses: true,
            courses
        });
    } catch (e) {
        console.log('Error: ', e.message);
    }
});

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allowed) {
        return res.redirect('/');
    }
    try {
        const course = await Course.findById(req.params.id)
        res.render('course-edit', {
            title: `Edit ${course.title}`,
            course
        })
    } catch (e) {
        console.log('Error: ', e.message);
    }

});

router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.render('course', {
            layout: 'empty',
            title: `Course : ${course.title}`,
            course
        });
    } catch (e) {
        console.log('Error: ', e.message);
    }

});

router.post('/remove', async (req, res) => {
    try {
        await Course.deleteOne({ _id: req.body.id });
        res.redirect('/courses');
    } catch (e) {
        console.log('Error: ', e.message);
    }

});

router.post('/edit', async (req, res) => {
    const { id, ...course } = req.body;
    try {
        await Course.findByIdAndUpdate(id, course);
        res.redirect('/courses');

    } catch (e) {
        ``
        console.log('Error: ', e.message);
    }

    // update cart
    // const cart = await Cart.getAll();
    // const courses = cart.courses.map(c => {
    //     if (c.id === course.id) {
    //         return {
    //             ...c,
    //             title: course.title,
    //             price: course.price,
    //             img: course.img
    //         };
    //     }
    //     return c;
    // });

    // const price = courses.reduce((sum, c) => c.price * c.count + sum, 0);

    // const newCart = {
    //     courses,
    //     price
    // };

    // await Cart.update(newCart);

});



module.exports = router;