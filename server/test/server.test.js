// For Testing CRUD Requests using Mocha and Chai
// Abrar Akhand

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
// Assertion Style

chai.should();
chai.use(chaiHttp);


describe('Testing Server Authentication and Login', () => {

    describe('POST /auth/register', () => {
        it('Should create a user in the database', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({ username: 'test1', password: '1234asdf', email: 'test1@gmail.com' })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('Should not create a user in the database because of invalid password length', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({ username: 'test2', password: '1234', email: 'test2@gmail.com' })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe('POST /auth/login', () => {
        it('Should login a user', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send({ email: 'test1@gmail.com', password: '1234asdf' })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('Should not sign the user in since they have not create a user account', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({ username: 'test5', password: '1234789', email: 'test12@gmail.com' })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

});


