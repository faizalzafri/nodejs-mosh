const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
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

async function updateCourse(id) {

    // const result = await Course.deleteOne({ _id: id });
    // console.log('Delete Result', result);

    const course = await Course.findByIdAndRemove(id);
    console.log('Deleted Doc', course);
}


updateCourse('5cc20b60d027bf0984ff2db8');