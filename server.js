// app.js
// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config({ path: path.join(__dirname, '.env') });

// MIDDLEWARE
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DATABASE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/teamlink', { useNewUrlParser: true });

// ROUTES
app.use('/users', require('./controllers/users'));
app.use('/players', require('./controllers/players'));
app.use('/teams', require('./controllers/teams'));

app.get('/', (req, res) => {
    res.status(200).send('Documentation is available at: https://github.com/DacioRomero/TeamLink-API/wiki');
});

// LISTENER
if (require.main === module) {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app;
