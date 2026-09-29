const { Course, run } = require('./db');

const id = process.argv[2];
if (!id) {
    console.error('Usage: node update.js <courseId>');
    process.exit(1);
}

run(async () => {
    const result = await Course.updateOne(
        { _id: id },
        {
            isPublished: false,
            author: 'XYZ1'
        }
    );
    console.log('Update Result', result);

    const original = await Course.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                isPublished: true,
                author: 'XYZ'
            }
        }
    );
    console.log('Original Document', original);

    const updated = await Course.findByIdAndUpdate(
        id,
        {
            $set: {
                isPublished: false,
                author: 'XYZ'
            }
        },
        { returnDocument: 'after' }
    );
    console.log('Updated Document', updated);
});
