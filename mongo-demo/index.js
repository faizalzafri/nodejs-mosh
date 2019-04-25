const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected'))
    .catch(() => console.log('Failed to connect'));

