// test/users.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const server = require('../server');
const User = require('../models/user');

chai.should();
chai.use(chaiHttp);

describe('Users', () => {
  const user = {
    username: 'tester',
    password: 'tester',
  };

  it('should register', async () => {
    const originalCount = await User.countDocuments();

    const res = await chai.request(server)
      .post('/users/register')
      .send(user);

    res.should.have.status(200);
    originalCount.should.be.equal(await User.countDocuments() - 1);

    const userId = jwt.decode(res.text)._id;
    await User.findByIdAndDelete(userId);
  });

  it('should login', async () => {
    await chai.request(server)
      .post('/users/register')
      .send(user);

    const res = await chai.request(server)
      .post('/users/login')
      .send(user);

    res.should.have.status(200);

    const userId = jwt.decode(res.text)._id;
    await User.findByIdAndDelete(userId);
  });
});

after(() => mongoose.connection.close());
