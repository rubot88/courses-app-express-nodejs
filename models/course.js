const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class Course {
    constructor(title, price, img) {
        this.id = uuid();
        this.title = title;
        this.price = price;
        this.img = img;
    }

    _getObject() {
        return {
            id: this.id,
            title: this.title,
            price: this.price,
            img: this.img
        };
    }

    async save() {
        const courses = await Course.getAll();
        courses.push(this._getObject());

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        rej(err);
                    } else {
                        res();
                    }
                }
            )
        });
    }

    static getAll() {
        return new Promise((res, rej) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, data) => {
                    if (err) {
                        rej(err)
                    } else {
                        res(JSON.parse(data));
                    }
                }
            )
        })
    }
    static async getById(id) {
        const courses = await Course.getAll();
        return courses.find(course => course.id === id);
    }
    static async update(course) {
        const courses = await Course.getAll(),
            idx = courses.findIndex(c => c.id === course.id);
        courses[idx] = course;

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        rej(err);
                    } else {
                        res();
                    }
                }
            )
        });
    }
}

module.exports = Course;