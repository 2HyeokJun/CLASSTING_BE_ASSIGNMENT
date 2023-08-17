const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development'; // 지정된 환경변수가 없으면 'development'로 지정
const init_models = require('./init-models');
// config/config.json 파일에 있는 설정값들을 불러온다.
// config객체의 env변수(development)키 의 객체값들을 불러온다.
// 즉, 데이터베이스 설정을 불러온다고 말할 수 있다.
const config = require('../config/config.js')[env]

const db = {};

// new Sequelize를 통해 MySQL 연결 객체를 생성한다.
const sequelize = new Sequelize(config.database, config.username, config.password, config);



// 연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.
db.sequelize = init_models(sequelize);
db.sequelize.school_news.belongsTo(db.sequelize.school_list);
db.sequelize.student_subscription_school.belongsTo(db.sequelize.school_list, { foreignKey: 'school_id', targetKey: 'school_id' });
// db.sequelize.school_news.hasMany(db.sequelize.student_receives_newsfeed, {foreignKey: 'news_id', targetKey: 'news_id'});
db.sequelize.student_receives_newsfeed.belongsTo(db.sequelize.school_news, {foreignKey: 'news_id', targetKey: 'news_id'});


// 모듈로 꺼낸다.
module.exports = db;
module.exports = sequelize;