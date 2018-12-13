// test/teams.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const server = require('../server');
const Team = require('../models/team');
const User = require('../models/user');
const Comment = require('../models/comment');

chai.should();
chai.use(chaiHttp);

const sampleTeam = {
  name: 'NRG',
  description: 'Fueled by the energy of talented individuals, this particular team represents the concentrated ambition to achieve one goal. That goal: to build the ideal esports team for many years to come.',
  iconURL: 'https://static1.squarespace.com/static/56e0692bf699bb8546ef30d8/5874ea11f5e231cac817be56/59e1286d49fc2bb9042978de/1507928175465/NRG+Logo+Light+Background.png?format=2500w',
};

describe('Teams', () => {
  let auth;

  before(async () => {
    const res = await chai.request(server)
      .post('/users/register')
      .send({
        username: 'teams.test.js',
        password: 'API',
      });

    auth = res.text;
  });

  // TEST INDEX
  it('should index ALL teams on /teams GET', async () => {
    const res = await chai.request(server)
      .get('/teams');

    res.should.have.status(200);
    res.should.be.json;
  });

  let teamId;

  // TEST CREATE
  it('should create a SINGLE team on /teams POST', async () => {
    const res = await chai.request(server)
      .post('/teams')
      .set('Authorization', `Bearer ${auth}`)
      .send(sampleTeam);

    res.should.have.status(200);
    res.should.be.json;

    teamId = res.body._id;
  });

  // TEST SHOW
  it('shold show a SINGLE team on /teams/<id> GET', async () => {
    const res = await chai.request(server)
      .get(`/teams/${teamId}`);

    res.should.have.status(200);
    res.should.be.json;
  });

  // TEST UPDATE
  it('should update a SINGLE team on /teams/<id> PUT', async () => {
    const res = await chai.request(server)
      .put(`/teams/${teamId}`)
      .set('Authorization', `Bearer ${auth}`)
      .send({
        description: 'Updated',
      });

    res.should.have.status(200);
    res.should.be.json;
  });

  // TEST DELETE
  it('should delete a SINGLE team on /teams/<id> DELETE', async () => {
    const res = await chai.request(server)
      .delete(`/teams/${teamId}`)
      .set('Authorization', `Bearer ${auth}`);

    res.should.have.status(200);
    res.should.be.json;
  });

  describe('Comments', () => {
    const sampleComment = {
      content: 'this is a test',
    };

    it('should index ALL comments on /teams/<teamId>/comments GET', async () => {
      const res = await chai.request(server)
        .get(`/teams/${teamId}/comments`);

      res.should.have.status(200);
      res.should.be.json;
    });

    let commentId;

    it('should create a SINGLE comment on /teams/<teamId>/comments POST', async () => {
      const res = await chai.request(server)
        .post(`/teams/${teamId}/comments`)
        .set('Authorization', `Bearer ${auth}`)
        .send(sampleComment);

      res.should.have.status(200);
      res.should.be.json;

      commentId = res.body._id;
    });

    it('should show a SINGLE comment on /teams/<teamId>/comments/<id> GET', async () => {
      const res = await chai.request(server)
        .get(`/teams/${teamId}/comments/${commentId}`);

      res.should.have.status(200);
      res.should.be.json;
    });

    it('should update a SINGLE comment on /teams/<teamId>/comments/<id> PUT', async () => {
      const res = await chai.request(server)
        .put(`/teams/${teamId}/comments/${commentId}`)
        .set('Authorization', `Bearer ${auth}`)
        .send({
          content: 'changed test comment',
        });

      res.should.have.status(200);
      res.should.be.json;
    });

    it('should delete a SINGLE comment on /teams/<teamId>/comments/<id> DELETE', async () => {
      const res = await chai.request(server)
        .delete(`/teams/${teamId}/comments/${commentId}`)
        .set('Authorization', `Bearer ${auth}`);

      res.should.have.status(200);
      res.should.be.json;
    });

    after(() => Comment.findByIdAndDelete(commentId));
  });

  after(() => {
    const userId = jwt.decode(auth)._id;

    return Promise.all([
      Team.findByIdAndDelete(teamId),
      User.findByIdAndDelete(userId),
    ]);
  });
});

after(() => mongoose.connection.close());
