const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected'))
    .catch(() => console.log('Failed to connect'));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
        // match: 
    },
    category: {
        type: String,
        required: true,
        enum: ['webdev', 'mobdev', 'dbadmin'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    //Do some async work
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000)
                return v && v.length > 0;
            },
            message: 'A course should have atleast one tag'
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

async function createCourse() {
    const Course = mongoose.model('Course', courseSchema);
    const course = new Course({
        name: 'Angular',
        category: 'WebDev',
        author: 'XYZ',
        tags: ['FrontEnd'],
        isPublished: true,
        price: 20.4
    });

    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        for (error in ex.errors)
            console.log(ex.errors[error].message);
    }
}

async function getCourse() {
    const Course = mongoose.model('Course', courseSchema);
    const course = await Course.find({ _id: '5ccae73bbfd0a401ed40f82c' });
    console.log(course);
    console.log(course[0].price);
}
createCourse();
getCourse();