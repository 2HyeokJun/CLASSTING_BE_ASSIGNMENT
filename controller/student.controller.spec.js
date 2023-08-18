const App = require('../app');
const db = require('../models/index');
const request = require('supertest');

beforeAll(async () => {
    let response = await request(App.app).post('/student/token/1').expect(200);
    let student_access_token = response.body.access_token;
    global.student_access_token = student_access_token;
})

describe('GET /student/subscription_list', () => {
    it('정상적인 요청이므로 200 Response를 받음', async () => {
        expect(true).toBe(false);
    })
})

describe('GET /student/news/:school_id', () => {
    it('school_id가 없으므로 400 MissingParamError를 받음', async () => {
        let response = await request(App.app).get('/student/news')
                        .set('Authorization', `Bearer ${global.student_access_token}`);
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'MissingParamError',
            message: 'school_id missing'
        })
    })

    it('school_id가 숫자가 아니므로 400 InvalidParamError를 받음', async () => {
        let response = await request(App.app).get('/student/news/wrongschoolid')
                        .set('Authorization', `Bearer ${global.student_access_token}`);
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'InvalidParamError',
            message: 'school_id must be number'
        })
    })

    it('정상적인 요청이므로 200 Response를 받음', async () => {
        expect(true).toBe(false);
    })

})

describe('GET /student/newsfeed', () => {
    it('정상적인 요청이므로 200 Response를 받음', async () => {
        expect(true).toBe(false);
    })
})

describe('POST /student/subscribe/:school_id', () => {
    it('school_id가 없으므로 400 MissingParamError를 받음', async () => {
        let response = await request(App.app).post('/student/subscribe')
                        .set('Authorization', `Bearer ${global.student_access_token}`);
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'MissingParamError',
            message: 'school_id missing'
        })
    })

    it('school_id가 숫자가 아니므로 400 InvalidParamError를 받음', async () => {
        let response = await request(App.app).post('/student/subscribe/wrongschoolid')
                        .set('Authorization', `Bearer ${global.student_access_token}`);
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'InvalidParamError',
            message: 'school_id must be number'
        })
    })

    it('정상적인 요청이므로 200 Response를 받음', async () => {
        expect(true).toBe(false);
    })
})

describe('PUT /student/subscribe/:school_id', () => {
    it('school_id가 없으므로 400 MissingParamError를 받음', async () => {
        let response = await request(App.app).put('/student/subscribe')
                        .set('Authorization', `Bearer ${global.student_access_token}`);
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'MissingParamError',
            message: 'school_id missing'
        })
    })

    it('school_id가 숫자가 아니므로 400 InvalidParamError를 받음', async () => {
        let response = await request(App.app).put('/student/subscribe/wrongschoolid')
                        .set('Authorization', `Bearer ${global.student_access_token}`);
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'InvalidParamError',
            message: 'school_id must be number'
        })
    })

    it('정상적인 요청이므로 200 Response를 받음', async () => {
        expect(true).toBe(false);
    })
})

