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
        Player.create(samplePlayer)
        .then(player => {
            playerId = player._id;
        })
        .catch(console.error)
        .finally(() => {
            done();
        });
    });

    describe('Browser', () => {
        // TEST INDEX
        it('should index ALL comments on /players/<playerId>/comments GET', done => {
            chai.request(server)
            .get(`/players/${playerId}/comments`)
            .then(res => {
                res.should.have.status(200);
                res.should.be.html;
            })
            .catch(console.error)
            .finally(() => {
                done();
            });
        });

        // TEST NEW
        it('should display new form on /players/<playerId>/comments/new GET', done => {
            chai.request(server)
            .get(`/players/${playerId}/comments`)
            .then(res => {
                res.should.have.status(200);
                res.should.be.html;
            })
            .catch(console.error)
            .finally(() => {
                done();
            });
        });

        let commentId;

        // TEST INDEX
        it('should index ALL comments on /players/<playerId>/comments GET', done => {
            chai.request(server)
            .get(`/players/${playerId}/comments`)
            .then(res => {
                res.should.have.status(200);
                res.should.be.html;
            })
            .catch(console.error)
            .finally(() => {
                done();
            });
        });

        // TEST CREATE
        it('should create a SINGLE comment on /players/<playerId>/comments POST', done => {
            const url = `/players/${playerId}/comments`;
            const fullComment = Object.assign({}, sampleComment, { playerId: playerId })

            chai.request(server)
            .post(url)
            .send(fullComment)
            .then(res => {
                res.should.have.status(200);
                res.should.be.html;
                commentId = res.redirects[0].substring(res.redirects[0].lastIndexOf('/') + 1);
            })
            .catch(console.error)
            .finally(() => {
                done();
            });
        });

        // TEST SHOW
        it('should show a SINGLE comment on /players/<playerId>/comments/<id> GET', done => {
            const url = `/players/${playerId}/comments/${commentId}`;

            chai.request(server)
            .get(url)
            .then(res => {
                res.should.have.status(200);
                res.should.be.html;
            })
            .catch(console.error)
            .finally(() => {
                done();
            });
        })

        // TEST EDIT
        it('should edit a SINGLE comment on /players/<playerId>/comments/<id> GET', done => {
            const url = `/players/${playerId}/comments/${commentId}/edit`;

            chai.request(server)
            .get(url)
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
        it('should update a SINGLE comment on /players/<playerId>/comments/<id> PUT', done => {
            const url = `/players/${playerId}/comments/${commentId}`;

            chai.request(server)
            .put(url)
            .send({ content: 'Nevermind' })
            .then(res => {
                res.should.have.status(200);
                res.should.be.html;
            })
            .catch(console.error)
            .finally(() => {
                done();
            });
        });

        // TEST DELETE
        it('should delete a SINGLE comment on /players/<playerId>/comments/<id> DELETE', done => {
            let url = `/players/${playerId}/comments/${commentId}`;

            chai.request(server)
            .delete(url)
            .then(res => {
                res.should.have.status(200);
                res.should.be.html;
            })
            .catch(console.error)
            .finally(() => {
                done();
            });
        });

        after(done => {
            Comment.findByIdAndRemove(commentId).lean()
            .catch(console.error)
            .finally(() => {
                done();
            });
        });
    });

    describe('API', () => {
        // TEST INDEX
        it('should index ALL comments on /api/players/<playerId>/comments GET', done => {
            chai.request(server)
            .get(`/api/players/${playerId}/comments`)
            .then(res => {
                res.should.have.status(200);
                res.should.be.json;
            })
            .catch(console.error)
            .finally(() => {
                done();
            });
        });

        let commentId;

        // TEST CREATE
        it('should create a SINGLE comment on /api/players/<playerId>/comments POST', done => {
            const url = `/api/players/${playerId}/comments`;
            const fullComment = Object.assign({}, sampleComment, { playerId: playerId })

            chai.request(server)
            .post(url)
            .send(fullComment)
            .then(res => {
                res.should.have.status(200);
                res.should.be.json;
                commentId = res.body._id
            })
            .catch(console.error)
            .finally(() => {
                done();
            });
        });

        // TEST SHOW
        it('should show a SINGLE comment on /api/players/<playerId>/comments/<id> GET', done => {
            const url = `/api/players/${playerId}/comments/${commentId}`;

            chai.request(server)
            .get(url)
            .then(res => {
                res.should.have.status(200);
                res.should.be.json;
            })
            .catch(console.error)
            .finally(() => {
                done();
            });
        })

        // TEST UPDATE
        it('should update a SINGLE comment on /api/players/<playerId>/comments/<id> PUT', done => {
            const url = `/api/players/${playerId}/comments/${commentId}`;

            chai.request(server)
            .put(url)
            .send({ content: 'Nevermind' })
            .then(res => {
                res.should.have.status(200);
                res.should.be.json;
            })
            .catch(console.error)
            .finally(() => {
                done();
            });
        });

        // TEST DELETE
        it('should delete a SINGLE comment on /api/players/<playerId>/comments/<id> DELETE', done => {
            const url = `/api/players/${playerId}/comments/${commentId}`;

            chai.request(server)
            .delete(url)
            .then(res => {
                res.should.have.status(200);
                res.should.be.json;
            })
            .catch(console.error)
            .finally(() => {
                done();
            });
        });

        after(done => {
            Comment.findByIdAndRemove(commentId).lean()
            .catch(console.error)
            .finally(() => {
                done();
            });
        });
    });

    after(done => {
        Player.findByIdAndRemove(playerId).lean()
        .catch(console.error)
        .finally(() => {
            done();
        });
    });
});
