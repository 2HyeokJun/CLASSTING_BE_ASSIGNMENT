# ** CLASSTING_BE_ASSIGNMENT**
  - 필요 프로그램 설치: 
```
  npm install
```
  - 테스트 코드 실행: DB에 mock서버를 실제 api와 연동하지 못해 해당 부분의 테스트 코드는 전부 실패 처리했습니다.
```
  npm test
```
  - 서버 실행: 
```
  npm start
```

# ** API LIST**

## 0. default url: localhost:3000
## 1. [POST] /admin/token (관리자 토큰 발급)

#### (1) request
  - example: localhost:3000/admin/token

#### (2) response
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTIyMzk2NzIsImV4cCI6MTY5MjMyNjA3Mn0.vihtetL12-GqcgPAH7idBq2HISfrQE5a1fPCStWDv-Q"
}
```

## 2. [POST] /admin/enroll (학교 등록)

#### (1) request
  - authorization: access_token
  - body: school_region, school_name
  - example: localhost:3000/admin/enroll
  ```
  {
    "school_region": "서울시 한국구",
    "school_name": "한국중학교"
  }
  ```

#### (2) response
- school_region이 없을 때:
```
  {
    "status": "MissingParamError",
    "message": "school_region missing"
  }
```

- school_name이 없을 때:

```
{
    "status": "MissingParamError",
    "message": "school_name missing"
}
```
- 이미 존재하는 (school_region, school_name)일 때:
```
{
    status: 'Bad Request',
    message: 'School already exists',
    school_id: 1,
}
```
- 서버 에러일 때:
```
{
    status: 'InternalServerError',
    message: 'Server Error occurred',
}
```
- 정상적인 접근일 때:
```
{
    status: 'success',
    message: 'enroll school succeed',
    school_id: 1,
}
```
## 3. [POST] /admin/news/:school_id (소식 작성)
#### (1) request
  - authorization: access_token
  - params: school_id
  - body: news_content
  - example: localhost:3000/admin/news/3
```
{
    "news_content": "test news"
}
```

#### (2) response
- school_id가 없을 때:
```
  {
    "status": 'MissingParamError',
    "message": 'school_id missing',
  }
```

- news_content가 없을 때:

```
{
    "status": 'MissingParamError',
    "message": 'news_content missing'
}
```
- 존재하지 않는 school_id일 때:
```
{
    "status": 'InvalidParamError',
    "message": 'invalid school_id'
}
```
- 서버 에러일 때:
```
{
    status: 'InternalServerError',
    message: 'Server Error occurred',
}
```
- 정상적인 접근일 때:
```
{
    status: 'success',
    message: 'Write news succeed',
    news_id: 1,
}
```

## 4. [PUT] /admin/news/:news_id (소식 수정)
#### (1) request
  - authorization: access_token
  - params: news_id
  - body: school_id, news_content
  - example: localhost:3000/admin/news/3
```
{
    "school_id": 1,
    "news_content": "test news"
}
```

#### (2) response
- school_id가 없을 때:
```
  {
    "status": 'MissingParamError',
    "message": 'school_id missing',
  }
```

- news_content가 없을 때:

```
{
    "status": 'MissingParamError',
    "message": 'news_content missing'
}
```
- 존재하지 않는 school_id일 때:
```
{
    "status": 'InvalidParamError',
    "message": 'invalid school_id'
}
```
- 서버 에러일 때:
```
{
    status: 'InternalServerError',
    message: 'Server Error occurred',
}
```
- 정상적인 접근일 때:
```
{
    status: 'success',
    message: 'update news succeed',
}
```

## 5. [DELETE] /admin/news/:news_id (소식 수정)
#### (1) request
  - authorization: access_token
  - params: news_id
  - example: localhost:3000/admin/news/3
```
{
    "school_id": 1,
    "news_content": "test news"
}
```

#### (2) response
- school_id가 없을 때:
```
  {
    "status": 'MissingParamError',
    "message": 'school_id missing',
  }
```
- 존재하지 않는 school_id일 때:
```
{
    "status": 'InvalidParamError',
    "message": 'invalid school_id'
}
```
- 서버 에러일 때:
```
{
    status: 'InternalServerError',
    message: 'Server Error occurred',
}
```
- 정상적인 접근일 때:
```
{
    status: 'success',
    message: 'update news succeed',
}
```

## 6. [POST] /student/token/:student_id (학생 토큰 발급)
#### (1) request
  - example: localhost:3000/student/token/1
  - 회원가입 없이 학생을 구별하기 위해 student_id로 token을 구분해서 발행. 값을 입력하지 않을 경우 student_id = 1로 발급됨.

#### (2) response
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTIyMzk2NzIsImV4cCI6MTY5MjMyNjA3Mn0.vihtetL12-GqcgPAH7idBq2HISfrQE5a1fPCStWDv-Q"
}
```

## 7. [GET] /student/subscription_list (구독중인 학교 리스트 조회)
#### (1) request
  - authorization: access_token
  - example: localhost:3000/student/subscription_list
#### (2) response
```
{
    "status": "success",
    "subscription_school_list": [
        {
            "school_region": "서울시 한국구",
            "school_name": "한국중학교"
        }
    ]
}
```

## 8. [GET] /student/news/:school_id (school_id를 가진 학교의 소식 조회)
#### (1) request
  - authorization: access_token
  - example: localhost:3000/student/news/1
#### (2) response
- school_id가 없을 때:
```
  {
    "status": 'MissingParamError',
    "message": 'school_id missing',
  }
```
- 존재하지 않는 school_id일 때:
```
{
    "status": 'InvalidParamError',
    "message": 'invalid school_id'
}
```
- 서버 에러일 때:
```
{
    status: 'InternalServerError',
    message: 'Server Error occurred',
}
```
- 정상적인 접근일 때:
```
{
    "status": "success",
    "news_list": [
        {
            "news_id": 14,
            "news_content": "뉴스13",
            "created_at": "2023-08-17T07:45:35.000Z",
            "updated_at": "2023-08-17T07:45:35.000Z"
        },
        {
            "news_id": 13,
            "news_content": "뉴스11",
            "created_at": "2023-08-17T07:43:49.000Z",
            "updated_at": "2023-08-17T07:43:49.000Z"
        },
        ...
        {
            "news_id": 1,
            "news_content": "뉴스1",
            "created_at": "2023-08-17T00:45:47.000Z",
            "updated_at": "2023-08-17T00:45:47.000Z"
        }
    ]
}
```
## 9. [GET] student/newsfeed (구독중인 학교들의 소식을 모아서 뉴스피드에서 조회)
#### (1) request
  - authorization: access_token
  - example: localhost:3000/student/newsfeed
#### (2) response
```
{
    "status": "success",
    "newsfeed_list": [
        {
            "news_id": 13,
            "newsfeed_id": 0,
            "news_content": "뉴스11",
            "created_at": "2023-08-17T07:43:49.000Z",
            "updated_at": "2023-08-17T07:43:49.000Z"
        }
    ]
}
```

## 10. [POST] student/subscribe/:school_id (해당 school_id를 가진 학교를 구독)
- school_id가 없을 때:
```
  {
    "status": 'MissingParamError',
    "message": 'school_id missing',
  }
```
- 존재하지 않는 school_id일 때:
```
{
    "status": 'InvalidParamError',
    "message": 'invalid school_id'
}
```
- 서버 에러일 때:
```
{
    status: 'InternalServerError',
    message: 'Server Error occurred',
}
```
- 정상적인 접근일 때:
```
{
    "status": "success",
    "message": "subscribe succeed"
}
```

## 11. [PUT] student/subscribe/:school_id (해당 school_id를 가진 학교를 구독 해지)
- school_id가 없을 때:
```
  {
    "status": 'MissingParamError',
    "message": 'school_id missing',
  }
```
- 존재하지 않는 school_id일 때:
```
{
    "status": 'InvalidParamError',
    "message": 'invalid school_id'
}
```
- 서버 에러일 때:
```
{
    status: 'InternalServerError',
    message: 'Server Error occurred',
}
```
- 정상적인 접근일 때:
```
{
    "status": "success",
    "message": "unsubscribe succeed"
}
```