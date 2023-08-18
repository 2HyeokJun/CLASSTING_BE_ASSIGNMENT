const App = require('../app');
const db = require('../models/index');
const request = require('supertest');

beforeAll(async () => {
    let response = await request(App.app).post('/admin/token').expect(200);
    let admin_access_token = response.body.access_token;
    global.admin_access_token = admin_access_token;
})

describe('POST /admin/enroll', () => {
    beforeAll(async () => {
        await db.models.school_list.destroy({
            where: {},
            truncate: true,
        })
    })
    it('body에 school_region이 없으므로 400 MissingParamError를 받음', async () => {
        let response = await request(App.app).post('/admin/enroll')
                        .set('Authorization', `Bearer ${global.admin_access_token}`)
                        .send({
                            school_name: 'test_school_name',
                        });
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'MissingParamError',
            message: 'school_region missing',
        })
    })

    it('body에 school_name이 없으므로 400 MissingParamError를 받음', async () => {
        let response = await request(App.app).post('/admin/enroll')
                        .set('Authorization', `Bearer ${global.admin_access_token}`)
                        .send({
                            school_region: 'test_school_region',
                        });
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'MissingParamError',
            message: 'school_name missing',
        })
    })

    it('정상적인 요청이지만 이미 등록된 (지역명, 학교명)이므로 400 Bad Request를 받음', async () => {        
        expect(true).toBe(false);
    })

    it('정상적인 요청이므로 200 Response를 받음', async () => {
        expect(true).toBe(false);
    })
})

describe('POST /admin/news/:school_id?', () => {
    beforeAll(async () => {
        await db.models.school_news.destroy({
            where: {},
            truncate: true,
        })
    })
    it('req.params에 school_id가 없으므로 400 MissingParamError를 받음', async () => {
        let response = await request(App.app).post('/admin/news')
                        .set('Authorization', `Bearer ${global.admin_access_token}`)
                        .send({
                            news_content: 'test_news_content',
                        });
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'MissingParamError',
            message: 'school_id missing'
        })
    })

    it('req.body에 news_content가 없으므로 400 MissingParamError를 받음', async () => {
        let response = await request(App.app).post('/admin/news/1')
                        .set('Authorization', `Bearer ${global.admin_access_token}`)
                        .send({
                            // news_content: 'test_news_content',
                        });
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'MissingParamError',
            message: 'news_content missing'
        })
    })

    it('정상적으로 처리되어 200 success를 받음', async () => {
        expect(true).toBe(false);
    })
})

describe('PUT /admin/news/:news_id?', () => {
    beforeAll(async () => {
        await db.models.school_news.destroy({
            where: {},
            truncate: true,
        })
    })
    it('req.params에 news_id가 없으므로 400 MissingParamError를 받음', async () => {
        let response = await request(App.app).put('/admin/news')
                        .set('Authorization', `Bearer ${global.admin_access_token}`)
                        .send({
                            news_content: 'test_news_content',
                        });
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'MissingParamError',
            message: 'news_id missing'
        })
    })

    it('req.body에 school_id가 없으므로 400 MissingParamError를 받음', async () => {
        let response = await request(App.app).put('/admin/news/1')
                        .set('Authorization', `Bearer ${global.admin_access_token}`)
                        .send({
                            // school_id: 1,
                            news_content: 'test_news_content',
                        });
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'MissingParamError',
            message: 'school_id missing'
        })
    })

    it('req.body에 news_content가 없으므로 400 MissingParamError를 받음', async () => {
        let response = await request(App.app).put('/admin/news/1')
                        .set('Authorization', `Bearer ${global.admin_access_token}`)
                        .send({
                            school_id: 1,
                            // news_content: 'test_news_content',
                        });
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'MissingParamError',
            message: 'news_content missing'
        })
    })

    it('정상적으로 처리되어 200 success를 받음', async () => {
        expect(true).toBe(false);
    })
})

describe('DELETE /admin/news/:news_id?', () => {
    beforeAll(async () => {
        await db.models.school_news.destroy({
            where: {},
            truncate: true,
        })
    })
    it('req.params에 news_id가 없으므로 400 MissingParamError를 받음', async () => {
        let response = await request(App.app).delete('/admin/news')
                        .set('Authorization', `Bearer ${global.admin_access_token}`)
                        .send({
                            news_content: 'test_news_content',
                        });
        let response_body = response.body;

        expect(response.status).toBe(400);
        expect(response_body).toStrictEqual({
            status: 'MissingParamError',
            message: 'news_id missing'
        })
    })

    it('정상적으로 처리되어 200 success를 받음', async () => {
        expect(true).toBe(false);
    })
})
