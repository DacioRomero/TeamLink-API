const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Player = require('../../models/player');
const Comment = require('../../models/comment')

chai.should();
chai.use(chaiHttp);

const samplePlayer = {
    'battletag': 'Dacio#11366',
    'description': 'Looking to play professionally soon',
    'rank': 3198,
    'role': 'Flex',
    'iconURL': 'https://via.placeholder.com/200x200'
};

const sampleComment = {
    battletag: 'Jayne#21795',
    content: 'We\'d like you on our team'
};

describe('Comment API v1', () => {
    let playerId;

    before(() => {
        return Player.create(samplePlayer)
        .then(player => {
            playerId = player._id;
        });
    });

    let commentId;

    // TEST INDEX
    it('should index ALL comments on /v1/players/<playerId>/comments GET', () => {
        return chai.request(server)
        .get(`/v1/players/${playerId}/comments`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;
        });
    });

    // TEST CREATE
    it('should create a SINGLE comment on /v1/players/<playerId>/comments POST', () => {
        const url = `/v1/players/${playerId}/comments`;
        const fullComment = Object.assign({}, sampleComment, { playerId: playerId });

        return chai.request(server)
        .post(url)
        .send(fullComment)
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;

            commentId = res.body._id;
        });
    });

    // TEST SHOW
    it('should show a SINGLE comment on /v1/players/<playerId>/comments/<id> GET', () => {
        const url = `/v1/players/${playerId}/comments/${commentId}`;

        return chai.request(server)
        .get(url)
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;
        });
    });

    // TEST UPDATE
    it('should update a SINGLE comment on /v1/players/<playerId>/comments/<id> PUT', () => {
        const url = `/v1/players/${playerId}/comments/${commentId}`;

        return chai.request(server)
        .put(url)
        .send({ content: 'Nevermind' })
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;
        });
    });

    // TEST DELETE
    it('should delete a SINGLE comment on /v1/players/<playerId>/comments/<id> DELETE', () => {
        let url = `/v1/players/${playerId}/comments/${commentId}`;

        return chai.request(server)
        .delete(url)
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;
        });
    });

    after(() => {
        return Promise.all([
            Comment.findByIdAndDelete(commentId).lean(),
            Player.findByIdAndDelete(playerId).lean()
        ]);
    });
});
