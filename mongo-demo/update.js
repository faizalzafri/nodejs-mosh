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

    const result = await Course.updateOne(
        { _id: id },
        {
            isPublished: false,
            author: 'XYZ1'
        }
    );

    console.log('Update Result', result);
}

async function updateCourse2(id) {

    const course = await Course.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                isPublished: true,
                author: 'XYZ'
            }
        }
    );

    console.log('Original Document', course);
}

async function updateCourse3(id) {

    const course = await Course.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                isPublished: false,
                author: 'XYZ'
            }
        },
        { new: true }
    );

    console.log('Update Course', course);
}

updateCourse('5cc20b60d027bf0984ff2db7');
updateCourse2('5cc20b60d027bf0984ff2db7');
updateCourse3('5cc20b60d027bf0984ff2db7');