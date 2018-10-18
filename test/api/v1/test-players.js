const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../app');
const should = chai.should();
const Player = require('../../../models/player');

chai.use(chaiHttp);

const samplePlayer = {
    "battletag": "Dacio#11366",
    "description": "Looking to play professionally soon",
    "rank": 3198,
    "role": "Flex",
    "iconURL": "https://via.placeholder.com/200x200"
};

describe('Player API v1', () => {
    // TEST INDEX
    it('should index ALL players on /api/v1/players GET', () => {
        return chai.request(server)
        .get('/api/v1/players')
        .then(res => {
            res.should.have.status(200)
            res.should.be.json;
        });
    });

    let playerId;

    // TEST CREATE
    it('should create a SINGLE player on /api/v1/players POST', () => {
        return chai.request(server)
        .post('/api/v1/players')
        .send(samplePlayer)
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;
            
            playerId = res.body._id;
        });
    });

    // TEST SHOW
    it('shold show a SINGLE player on /api/v1/players/<id> GET', () => {
        return chai.request(server)
        .get(`/api/v1/players/${playerId}`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;
        });
    });

    // TEST UPDATE
    it('should update a SINGLE player on /api/v1/players/<id> PUT', () => {
        return chai.request(server)
        .put(`/api/v1/players/${playerId}`)
        .send({ 'rank': 200 })
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;
        });
    });

    // TEST DELETE
    it('should delete a SINGLE player on /api/v1/players/<id> DELETE', () => {
        return chai.request(server)
        .delete(`/api/v1/players/${playerId}`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;
        });
    });

    after(() => {
        return Player.findByIdAndDelete(playerId).lean();
    });
});
