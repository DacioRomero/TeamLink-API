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
    it('should index ALL players on /players GET', () => {
        return chai.request(server)
        .get('/players')
        .then(res => {
            res.should.have.status(200)
            res.should.be.html;
        })
    });

    // TEST NEW
    it('should display new form on /players/new GET', () => {
        return chai.request(server)
        .get('/players/new')
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        })
    });

    let playerId;

    // TEST CREATE
    it('should create a SINGLE player on /players POST', () => {
        return chai.request(server)
        .post('/players')
        .send(samplePlayer)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
            playerId = res.redirects[0].substring(res.redirects[0].lastIndexOf('/') + 1)
        })
    });

    // TEST SHOW
    it('shold show a SINGLE player on /players/<id> GET', () => {
        chai.request(server)
        .get(`/players/${playerId}`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        })
    });

    // TEST EDIT
    it('should edit a SINGLE player on /player/<id>/edit GET', () => {
        return chai.request(server)
        .get(`/players/${playerId}/edit`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        })
    });

    // TEST UPDATE
    it('should update a SINGLE player on /players/<id> PUT', () => {
        chai.request(server)
        .put(`/players/${playerId}`)
        .send({ 'rank': 200 })
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        })
    });

    // TEST DELETE
    it('should delete a SINGLE player on /players/<id> DELETE', () => {
        chai.request(server)
        .delete(`/players/${playerId}`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        })
    });

    after(() => {
        return Player.findByIdAndDelete(playerId).lean();
    });
});
