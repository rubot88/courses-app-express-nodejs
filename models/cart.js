const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

class Cart {
    static update(cart) {
        return new Promise((res, rej) => {
            fs.writeFile(
                p,
                JSON.stringify(cart),
                (err) => {
                    if (err) {
                        rej(err);
                    } else {
                        res(cart);
                    }
                }
            );
        });
    }
    static async remove(id) {
        const cart = await Cart.getAll();

        const idx = cart.courses.findIndex(c => c.id === id);
        const course = cart.courses[idx];

        if (course.count === 1) {
            // remove
            cart.courses = cart.courses.filter(course => course.id !== id);
        } else {
            //change count
            cart.courses[idx].count--
        }

        cart.price -= Number(course.price);
        return Cart.update(cart);
    }

    static async add(course) {
        const cart = await Cart.getAll();

        const idx = cart.courses.findIndex(c => c.id === course.id);
        const candidate = cart.courses[idx];

        if (candidate) {
            candidate.count++;
            cart.courses[idx] = candidate;
        } else {
            course.count = 1;
            cart.courses.push(course);
        }

        cart.price += Number(course.price);

        Cart.update(cart);

    }
    static async getAll() {
        return new Promise((res, rej) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    rej(err);
                } else {
                    res(JSON.parse(content));
                }
            })
        })
    }
}

module.exports = Cart;