const { Course, run } = require('./db');

run(async () => {
    const course = await Course.create({
        name: 'NodeJS',
        author: 'Faizal',
        tags: ['node', 'backend'],
        isPublished: true,
        price: 15
    });
    console.log(course);

    const course2 = await Course.create({
        name: 'Angular5',
        author: 'Faizal',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 25
    });
    console.log(course2);
});
