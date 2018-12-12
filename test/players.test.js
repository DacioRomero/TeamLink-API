// test/players.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const server = require('../server');
const Player = require('../models/player');
const User = require('../models/user');

chai.use(chaiHttp);
chai.should();

describe('Players', function () {
    const samplePlayer = {
        "battletag": "Dacio#11366",
        "description": "Looking to play professionally soon",
        "rank": 3198,
        "role": "Flex",
        "iconURL": "https://via.placeholder.com/200x200"
    };

    let auth;

    before(async function () {
        const res = await chai.request(server)
            .post('/users/register')
            .send({
                username: 'players.test.js',
                password: 'API'
            });

        auth = res.text;
    });

    // TEST INDEX
    it('should index ALL players on /players GET', async function () {
        const res = await chai.request(server)
            .get('/players');

        res.should.have.status(200);
        res.should.be.json;
    });

    let playerId;

    // TEST CREATE
    it('should create a SINGLE players on /players POST', async function () {
        const res = await chai.request(server)
            .post('/players')
            .set('Authorization', `Bearer ${auth}`)
            .send(samplePlayer);

        res.should.have.status(200);
        res.should.be.json;

        playerId = res.body._id;
    });

    // TEST SHOW
    it('shold show a SINGLE player on /players/<id> GET', async function () {
        const res = await chai.request(server)
            .get(`/players/${playerId}`);

        res.should.have.status(200);
        res.should.be.json;
    });

    // TEST UPDATE
    it('should update a SINGLE player on /players/<id> PUT', async function () {
        const res = await chai.request(server)
            .put(`/players/${playerId}`)
            .set('Authorization', `Bearer ${auth}`)
            .send({
                rank: 200
            });

        res.should.have.status(200);
        res.should.be.json;
    });

    // TEST DELETE
    it('should delete a SINGLE player on /players/<id> DELETE', async function () {
        const res = await chai.request(server)
            .delete(`/players/${playerId}`)
            .set('Authorization', `Bearer ${auth}`);

        res.should.have.status(200);
        res.should.be.json;
    });

    after(() => {
        const userId = jwt.decode(auth)._id;

        return Promise.all([
            Player.findByIdAndDelete(playerId),
            User.findByIdAndDelete(userId)
        ]);
    });
});
