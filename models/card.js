const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {
    static async add(course) {
        const card = await Card.getAll();

        const idx = card.courses.findIndex(c => c.id === course.id);
        const candidate = card.courses[idx];

        if (candidate) {
            candidate.count++;
            card.courses[idx] = candidate;
        } else {
            course.count = 1;
            card.courses.push(course);
        }

        card.price += Number(course.price);

        return new Promise((res, rej) => {
            fs.writeFile(
                p,
                JSON.stringify(card),
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

module.exports = Card;