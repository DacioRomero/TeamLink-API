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
}

describe('Comment', () => {
    let playerId;

    before(done => {
        let player = new Player(samplePlayer);
        player.save();
        playerId = player._id;
        done();
    });

    after(done => {
        Player.findByIdAndRemove(playerId, () => {
            done();
        });
    });

    // TEST INDEX
    it('should index ALL comments on /players/<playerId>/comments GET', done => {
        chai.request(server)
        .get(`/players/${playerId}/comments`)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        })
    });

    // TEST NEW
    it('should display new form on /players/<playerId>/comments/new GET', done => {
        chai.request(server)
        .get(`/players/${playerId}/comments`)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });

    describe('normal CRUD', () => {
        let commentId;

        // TEST INDEX
        it('should index ALL comments on /players/<playerId>/comments GET', done => {
            chai.request(server)
            .get(`/players/${playerId}/comments`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
        });

        // TEST CREATE
        it('should create a SINGLE comment on /players/<playerId>/comments POST', done => {
            let url = `/players/${playerId}/comments`;
            let fullComment = Object.assign({}, sampleComment, { playerId: playerId })

            chai.request(server)
            .post(url)
            .send(fullComment)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                commentId = res.redirects[0].substring(res.redirects[0].lastIndexOf('/') + 1);
                done();
            });
        });

        // TEST SHOW
        it('should show a SINGLE comment on /players/<playerId>/comments/<id> GET', done => {
            let url = `/players/${playerId}/comments/${commentId}`;

            chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
        })

        // TEST EDIT
        it('should edit a SINGLE comment on /players/<playerId>/comments/<id> GET', done => {
            let url = `/players/${playerId}/comments/${commentId}/edit`;

            chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
        });

        // TEST UPDATE
        it('should update a SINGLE comment on /players/<playerId>/comments/<id> PUT', done => {
            let url = `/players/${playerId}/comments/${commentId}`;

            chai.request(server)
            .put(url)
            .send({ content: 'Nevermind' })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
        });

        // TEST DELETE
        it('should delete a SINGLE comment on /players/<playerId>/comments/<id> DELETE', done => {
            let url = `/players/${playerId}/comments/${commentId}`;

            chai.request(server)
            .delete(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
        });

        after(done => {
            Comment.findByIdAndRemove(commentId, () => {
                done();
            });
        });
    });

    describe('api CRUD', () => {
        let commentId;

        // TEST INDEX
        it('should index ALL comments on /api/players/<playerId>/comments GET', done => {
            chai.request(server)
            .get(`/api/players/${playerId}/comments`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });

        // TEST CREATE
        it('should create a SINGLE comment on /api/players/<playerId>/comments POST', done => {
            let url = `/api/players/${playerId}/comments`;
            let fullComment = Object.assign({}, sampleComment, { playerId: playerId })

            chai.request(server)
            .post(url)
            .send(fullComment)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                commentId = res.body._id
                done();
            });
        });

        // TEST SHOW
        it('should show a SINGLE comment on /api/players/<playerId>/comments/<id> GET', done => {
            let url = `/api/players/${playerId}/comments/${commentId}`;

            chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        })

        // TEST UPDATE
        it('should update a SINGLE comment on /api/players/<playerId>/comments/<id> PUT', done => {
            let url = `/api/players/${playerId}/comments/${commentId}`;

            chai.request(server)
            .put(url)
            .send({ content: 'Nevermind' })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });

        // TEST DELETE
        it('should delete a SINGLE comment on /api/players/<playerId>/comments/<id> DELETE', done => {
            let url = `/api/players/${playerId}/comments/${commentId}`;

            chai.request(server)
            .delete(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });

        after(done => {
            Comment.findByIdAndRemove(commentId, () => {
                done();
            });
        });
    });
});
