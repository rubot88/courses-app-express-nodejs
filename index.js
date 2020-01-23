const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const aboutRoutes = require('./routes/about');
const ordersRoutes = require('./routes/orders');

const User = require('./models/user');

const app = express();

// add handlebars engine
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');



app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5e2737780d823a2328c6c7b4');
        req.user = user;

        next();
    } catch (e) {
        console.log('Error: ', e.message);

    }
})

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//registration of routes
app.use(express.urlencoded({ extended: true }));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);
app.use('/about', aboutRoutes);
app.use('/orders', ordersRoutes);

const PORT = process.env.PORT || 3000;

//define a mongoose connection
async function start() {
    const PASSWORD = `bwKkirh1AL7iegSL`;
    const URL = `mongodb+srv://rustam:${PASSWORD}@cluster0-qymrr.mongodb.net/coursesShop`;
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: 'admin@admin.com',
                name: 'admin',
                cart: {
                    items: []
                }
            });
            await user.save();
        }
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    } catch (error) {
        console.log(error);

    }
}

start();
