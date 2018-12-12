// test/root.test.js
const mongoose = require('mongoose');

after(function () {
    return mongoose.connection.close();
})
