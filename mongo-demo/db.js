const mongoose = require('mongoose');

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
}));

// Connect, run the demo, always disconnect so the script exits.
async function run(fn) {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/playground');
    try {
        await fn();
    } finally {
        await mongoose.disconnect();
    }
}

module.exports = { Course, run };
