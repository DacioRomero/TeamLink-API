const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Player = require('../models/player');

const samplePlayer = {
    "battletag": "Dacio#11366",
    "description": "Looking to play professionally soon",
    "rank": 3198,
    "role": "Flex",
    "iconURL": "https://via.placeholder.com/200x200"
};

chai.use(chaiHttp);

describe('Player', () => {
    let playerId;

    // TEST INDEX
    it('should index ALL players on /players GET', done => {
        chai.request(server)
        .get('/players')
        .end((err, res) => {
            res.should.have.status(200)
            res.should.be.html;
            done();
        });
    });

    // TEST NEW
    it('should display new form on /players/new GET', done => {
        chai.request(server)
        .get('/players/new')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done()
        });
    });

    // TEST CREATE
    it('should create a SINGLE player on /players POST', done => {
        chai.request(server)
        .post('/players')
        .send(samplePlayer)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;

            // Create variable for reusing player document
            playerId = res.redirects[0].substring(res.redirects[0].lastIndexOf('/') + 1)
            done();
        });
    });

    // TEST SHOW
    it('shold show a SINGLE player on /players/<id> GET', done => {
        chai.request(server)
        .get(`/players/${playerId}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });

    // TEST EDIT
    it('should edit a SINGLE player on /player/<id>/edit GET', done => {
        chai.request(server)
        .get(`/players/${playerId}/edit`)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });

    // TEST UPDATE
    it('should update a SINGLE player on /players/<id> PUT', done => {
        chai.request(server)
        .put(`/players/${playerId}`)
        .send({ 'rank': 200 })
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });

    // TEST DELETE
    it('should delete a SINGLE player on /players/<id> DELETE', done => {
        chai.request(server)
        .delete(`/players/${playerId}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });
});
