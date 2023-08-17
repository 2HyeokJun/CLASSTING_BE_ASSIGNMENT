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
    message: 'Server Error occured',
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
    message: 'Server Error occured',
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
    message: 'Server Error occured',
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
    message: 'Server Error occured',
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