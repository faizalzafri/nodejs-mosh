const { Course, run } = require('./db');

const id = process.argv[2];
if (!id) {
    console.error('Usage: node delete.js <courseId>');
    process.exit(1);
}

run(async () => {
    const course = await Course.findByIdAndDelete(id);
    console.log('Deleted Doc', course);
});
