const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Team = require('../models/team');

chai.use(chaiHttp);
chai.should();

const sampleTeam = {
    name: 'NRG',
    description: 'Fueled by the energy of talented individuals, this particular team represents the concentrated ambition to achieve one goal. That goal: to build the ideal esports team for many years to come.',
    iconURL: 'https://static1.squarespace.com/static/56e0692bf699bb8546ef30d8/5874ea11f5e231cac817be56/59e1286d49fc2bb9042978de/1507928175465/NRG+Logo+Light+Background.png?format=2500w',
};

describe('Team API v1', () => {
    // TEST INDEX
    it('should index ALL teams on /teams GET', () => {
        return chai.request(server)
        .get('/teams')
        .then(res => {
            res.should.have.status(200)
            res.should.be.json;
        });
    });

    let teamId;

    // TEST CREATE
    it('should create a SINGLE team on /teams POST', () => {
        return chai.request(server)
        .post('/teams')
        .send(sampleTeam)
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;

            teamId = res.body._id;
        });
    });

    // TEST SHOW
    it('shold show a SINGLE team on /teams/<id> GET', () => {
        return chai.request(server)
        .get(`/teams/${teamId}`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;
        });
    });

    // TEST UPDATE
    it('should update a SINGLE team on /teams/<id> PUT', () => {
        return chai.request(server)
        .put(`/teams/${teamId}`)
        .send({ 'rank': 200 })
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;
        });
    });

    // TEST DELETE
    it('should delete a SINGLE team on /teams/<id> DELETE', () => {
        return chai.request(server)
        .delete(`/teams/${teamId}`)
        .then(res => {
            res.should.have.status(200);
            res.should.be.json;
        });
    });

    after(() => {
        return Team.findByIdAndDelete(teamId).lean();
    });
});
