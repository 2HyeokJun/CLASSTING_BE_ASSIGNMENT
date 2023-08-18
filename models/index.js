const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const init_models = require('./init-models');
const config = require('../config/config.js')[env];
const SequelizeMock = require('sequelize-mock');

const db = {};
let sequelize;
if (env !== 'test') {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
else {
    sequelize = new SequelizeMock;
}


db.sequelize = init_models(sequelize);
db.sequelize.school_news.belongsTo(db.sequelize.school_list);
db.sequelize.student_subscription_school.belongsTo(db.sequelize.school_list, { foreignKey: 'school_id', targetKey: 'school_id' });
db.sequelize.student_receives_newsfeed.belongsTo(db.sequelize.school_news, {foreignKey: 'news_id', targetKey: 'news_id'});


module.exports = db;
module.exports = sequelize;