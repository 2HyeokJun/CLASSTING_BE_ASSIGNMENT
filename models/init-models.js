var DataTypes = require("sequelize").DataTypes;
var _school_list = require("./school_list");
var _school_news = require("./school_news");
var _student_subscription_school = require("./student_subscription_school");
var _student_receives_newsfeed = require('./student_receives_newsfeed');

function initModels(sequelize) {
  var school_list = _school_list(sequelize, DataTypes);
  var school_news = _school_news(sequelize, DataTypes);
  var student_subscription_school = _student_subscription_school(sequelize, DataTypes);
  var student_receives_newsfeed = _student_receives_newsfeed(sequelize, DataTypes);


  return {
    school_list,
    school_news,
    student_subscription_school,
    student_receives_newsfeed,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
