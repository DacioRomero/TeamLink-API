const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Player = require('../models/player');
const Comment = require('../models/comment')

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

describe('Comment', () => {
    let playerId;

    before(() => {
        return Player.create(samplePlayer)
        .then(player => {
            playerId = player._id;
        });
    });

    // TEST INDEX
    it('should index ALL comments on /players/<playerId>/comments GET', () => {
        return chai.request(server)
        .get(`/players/${playerId}/comments`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        });
    });

    // TEST NEW
    it('should display new form on /players/<playerId>/comments/new GET', () => {
        return chai.request(server)
        .get(`/players/${playerId}/comments`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        });
    });

    let commentId;

    // TEST CREATE
    it('should create a SINGLE comment on /players/<playerId>/comments POST', () => {
        const url = `/players/${playerId}/comments`;
        const fullComment = Object.assign({}, sampleComment, { playerId: playerId });

        return chai.request(server)
        .post(url)
        .send(fullComment)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;

            commentId = res.redirects[0].substring(res.redirects[0].lastIndexOf('/') + 1);
        });
    });

    // TEST SHOW
    it('should show a SINGLE comment on /players/<playerId>/comments/<id> GET', () => {
        const url = `/players/${playerId}/comments/${commentId}`;

        return chai.request(server)
        .get(url)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        });
    });

    // TEST EDIT
    it('should edit a SINGLE comment on /players/<playerId>/comments/<id> GET', () => {
        const url = `/players/${playerId}/comments/${commentId}/edit`;

        return chai.request(server)
        .get(url)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        });
    });

    // TEST UPDATE
    it('should update a SINGLE comment on /players/<playerId>/comments/<id> PUT', () => {
        const url = `/players/${playerId}/comments/${commentId}`;

        return chai.request(server)
        .put(url)
        .send({ content: 'Nevermind' })
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        });
    });

    // TEST DELETE
    it('should delete a SINGLE comment on /players/<playerId>/comments/<id> DELETE', () => {
        let url = `/players/${playerId}/comments/${commentId}`;

        return chai.request(server)
        .delete(url)
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        });
    });

    after(() => {
        return Promise.all([
            Comment.findByIdAndDelete(commentId).lean(),
            Player.findByIdAndDelete(playerId).lean()
        ]);
    });
});
