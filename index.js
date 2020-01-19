const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const aboutRoutes = require('./routes/about');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

// set handlebars engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//registration of routes
app.use(express.urlencoded({ extended: true }));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);
app.use('/about', aboutRoutes);

const PORT = process.env.PORT || 3000;

//define a mongoose connection
(async function () {
    const PASSWORD = `bwKkirh1AL7iegSL`;
    const URL = `mongodb+srv://rustam:${PASSWORD}@cluster0-qymrr.mongodb.net/test?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    } catch (error) {
        console.log(error);

    }
})();
