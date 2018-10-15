const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Player = require('../models/player');

chai.use(chaiHttp);

const samplePlayer = {
    "battletag": "Dacio#11366",
    "description": "Looking to play professionally soon",
    "rank": 3198,
    "role": "Flex",
    "iconURL": "https://via.placeholder.com/200x200"
};

describe('Player', () => {
    // TEST INDEX
    it('should index ALL players on /players GET', done => {
        chai.request(server)
        .get('/players')
        .then(res => {
            res.should.have.status(200)
            res.should.be.html;
        })
        .catch(console.error)
        .finally(() => {
            done();
        });
    });

    // TEST NEW
    it('should display new form on /players/new GET', done => {
        chai.request(server)
        .get('/players/new')
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        })
        .catch(console.error)
        .finally(() => {
            done();
        });
    });

    let playerId;

    // TEST CREATE
    it('should create a SINGLE player on /players POST', done => {
        chai.request(server)
        .post('/players')
        .send(samplePlayer)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
            playerId = res.redirects[0].substring(res.redirects[0].lastIndexOf('/') + 1)
        })
        .catch(console.error)
        .finally(() => {
            done();
        });
    });

    // TEST SHOW
    it('shold show a SINGLE player on /players/<id> GET', done => {
        chai.request(server)
        .get(`/players/${playerId}`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        })
        .catch(console.error)
        .finally(() => {
            done();
        });
    });

    // TEST EDIT
    it('should edit a SINGLE player on /player/<id>/edit GET', done => {
        chai.request(server)
        .get(`/players/${playerId}/edit`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        })
        .catch(console.error)
        .finally(() => {
            done();
        });
    });

    // TEST UPDATE
    it('should update a SINGLE player on /players/<id> PUT', done => {
        chai.request(server)
        .put(`/players/${playerId}`)
        .send({ 'rank': 200 })
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        })
        .catch(console.error)
        .finally(() => {
            done();
        })
    });

    // TEST DELETE
    it('should delete a SINGLE player on /players/<id> DELETE', done => {
        chai.request(server)
        .delete(`/players/${playerId}`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        })
        .catch(console.error)
        .finally(() => {
            done();
        });
    });
});
