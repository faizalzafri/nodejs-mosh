const { Course, run } = require('./db');

// Usage: node query.js [pageNumber]
const pageNumber = Number(process.argv[2]) || 1;
const pageSize = 10;

run(async () => {
    const courses = await Course
        .find({ author: /.*Faiz.*/ })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .select({ name: 1 });
    console.log(courses);
});
