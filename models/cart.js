const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

class Cart {
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

        return new Promise((res, rej) => {
            fs.writeFile(
                p,
                JSON.stringify(cart),
                (err) => {
                    if (err) {
                        rej(err);
                    } else {
                        res();
                    }
                }
            );
        });

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