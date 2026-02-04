const request = require('supertest');
const { app } = require('../server')
const jwt = require('jsonwebtoken');
const config = require('../config');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const User = require('../api/users/users.model');
const usersService = require('../api/users/users.service');
//mockingoose -D -> -D mode dev gere toutes les méthodes
//supertest -D (test Http)
describe('tester API user', () => {


    // npm i supertest -D // framework test HTTP - test route api
    let token;
    const USER_ID = 'fake';
    const MOCK_DATA = [{
        _id: USER_ID,
        name: 'test',
        email: 'test@test.com',
        password: 'dezrezrfsqfs'
    }];
    const MOCK_DATA_CREATED = {
        name: 'test',
        email: 'test@test.com',
        password: 'dezrezrfsqfs'
    }
    beforeEach(() => {
        token = jwt.sign({ userId: USER_ID }, config.secretJwtToken)  // creation token
        jest.spyOn(User, 'findById').mockResolvedValue(MOCK_DATA[0]);
        // mongoose.Query.prototype.find = jest.fn().mockResolvedValue(MOCK_DATA);
        //   mockingoose(User).toReturn(MOCK_DATA, 'findById'); // find = méthode du service issu du schema mongoose bcp plus simple -> USer = model user
        //   mockingoose(User).toReturn(MOCK_DATA_CREATED, 'save');
    });

    test('[Users] get all ', async () => {
        const res = await request(app) // on utilise supertest param => app
            .get('/api/users')
            .set('x-access-token', token);
        expect(res.status).toBe(200); // seul -> 401 pas d'auth
        // expect(res.body.length).toBeGreaterThan(0); // tableau non vide
    })
    /*
        // on utilise supertest param => app
        test('[Users] create user ', async () => {
            const res = await request(app)
                .post('/api/users')
                .send(MOCK_DATA_CREATED)
                .set('x-access-token', token)
            expect(res.status).toBe(201); // creation?
            expect(res.body.name).toBe(MOCK_DATA_CREATED.name);
        })
    */
    // espion
    /*
    test('est ce userService.getAll', async () => {

        const spy = jest.spyOn(usersService, "getAll").mockImplementation(() => 'test')
        const res = await request(app) // on utilise supertest param => app
            .get('/api/users').set('x-access-token', token);
        expect(spy).toHaveBeenCalled(); // est ce qu'elle est appelé?
        // expect(spy).toHaveBeenCalledTimes(1); // combien de fois? il s'agit d'une comparaison... 1 car une fois appelé.
        //expect(spy).toHaveReturnWith("test"); // 

    });
*/
    afterEach(() => {
        jest.restoreAllMocks(); // on reinitialise tout
    })
});

