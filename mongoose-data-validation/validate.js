const mongoose = require('mongoose');
const { setTimeout } = require('node:timers/promises');
const { run } = require('../mongo-demo/db');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['webdev', 'mobdev', 'dbadmin'],
        lowercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            // Async validator: mongoose waits for the returned promise.
            validator: async (v) => {
                await setTimeout(100);
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 20,
        max: 200,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v)
    }
});

// Own model name so it does not clash with Course from db.js.
const Course = mongoose.model('ValidatedCourse', courseSchema);

async function createCourse(data) {
    try {
        const course = await Course.create(data);
        console.log(course);
        return course;
    } catch (ex) {
        for (const field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

run(async () => {
    const course = await createCourse({
        name: 'Angular',
        category: 'WebDev',
        author: 'XYZ',
        tags: ['FrontEnd'],
        isPublished: true,
        price: 20.4
    });
    console.log((await Course.findById(course._id)).price);

    // Fails validation: short name, bad category, no tags, no price.
    await createCourse({ name: 'A', category: 'x', tags: [], isPublished: true });
});
