const request = require('supertest');
const app = require('../app'); // Express 앱 인스턴스를 가져옵니다.
const db = require('../models/index'); // Sequelize DB 설정을 가져옵니다.

describe('enroll_school API', () => {
    it('should enroll a school and return success response', async () => {
        const mockReqBody = {
            school_region: 'Test Region',
            school_name: 'Test School',
        };

        // 학교 등록 요청을 보냅니다.
        const response = await request(app)
            .post('/enroll_school') // 알맞은 엔드포인트로 수정해주세요
            .send(mockReqBody);

        // 응답 검증
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Enroll succeed');
        expect(response.body.school_id).toBeDefined();

        // 데이터베이스에서 실제로 학교 정보가 등록되었는지 확인 (예시로 school_id로 확인)
        const enrolledSchool = await db.models.school_list.findOne({
            where: {
                school_id: response.body.school_id,
            },
        });
        expect(enrolledSchool).toBeTruthy();
        expect(enrolledSchool.school_region).toBe(mockReqBody.school_region);
        expect(enrolledSchool.school_name).toBe(mockReqBody.school_name);
    });
});
