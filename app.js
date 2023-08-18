const express = require('express');
const adminRouter = require('./router/admin.router');
const studentRouter = require('./router/student.router');
const sequelize = require('./models');

require('dotenv').config();

class App {
    constructor() {
        this.app = express();
        this.sequelize = this.dbConnection();
        this.setMiddleWare();
        this.getRouting();
    }
    

    dbConnection() {
        if (process.env.NODE_ENV !== 'test') {
            sequelize.authenticate().then(() => {
                console.log('서버와 연결 성공');
                return sequelize.sync();
            })
            .then(() => {
                console.log('Sync 완료');
            })
            .catch((err) => {
                console.error('DB와 연결할 수 없음:', err);
            });
        }
    }

    setMiddleWare() {
        this.app.use(express.json()); 
        this.app.use(express.urlencoded({ extended : true})); 
    }

    getRouting() {
        this.app.use('/admin', adminRouter);
        this.app.use('/student', studentRouter);
    }
}

module.exports = new App();