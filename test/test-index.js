const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Index', () => {
    it('should display the homepage on / GET', () => {
        return chai.request(server)
        .get('/')
        .then(res => {
            res.should.have.status(200);
            res.should.be.html;
        });
    });
});
