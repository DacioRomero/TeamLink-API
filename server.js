// app.js
// DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config({ path: path.join(__dirname, '.env') });

// MIDDLEWARE
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// DATABASE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/teamlink', { useNewUrlParser: true });

// ROUTES
app.use('/user', require('./controllers/user'));
app.use('/players', require('./controllers/players'));
app.use('/teams', require('./controllers/teams'));

// LISTENER
if (require.main === module) {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app;
