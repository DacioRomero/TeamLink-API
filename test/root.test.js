// test/root.test.js
const mongoose = require('mongoose');

after(() => {
    return mongoose.connection.close();
})
