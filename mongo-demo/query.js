const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected'))
    .catch(() => console.log('Failed to connect'));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getData() {
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
        // .find({ author: /^Faizal/i })
        // .find({ author: /.*zal$/i })
        .find({ author: /.*Faiz.*/ })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .select({ name: 1 });
    console.log(courses);
}
getData();