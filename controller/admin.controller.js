const fn = require('../functions');
const sequelize = require('../models/index');
const db = require('../models/index');

const publish_token = async (req, res) => {
    let token = fn.publish_token('admin');
    res.status(200).json({
        access_token:token,
    });
}

const enroll_school = async (req, res) => {
    let {school_region, school_name} = req.body;
    try {
        let is_school_exists = await db.models.school_list.findOne({
            attributes: ['school_id'],
            where: {
                school_region: school_region,
                school_name: school_name,
            },
        });

        if (is_school_exists) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'School already exists',
                school_id: is_school_exists.dataValues.school_id,
            })
        }

        let enroll_school_result = await db.models.school_list.create({
            school_region: school_region,
            school_name: school_name,
        });

        return res.status(200).json({
            status: 'success',
            message: 'enroll school succeed',
            school_id: enroll_school_result.dataValues.school_id,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'InternalServerError',
            message: 'Server Error occurred',
        })
    }
}

const write_school_news = async (req, res) => {
    let school_id = req.params.school_id;
    let news_content = req.body.news_content;
    let news_id;
    const transaction = await sequelize.transaction();
    try {
        // #1. school_news에 insert
        let write_news_result = await db.models.school_news.create({
            school_id: school_id,
            news_content: news_content,
            transaction: transaction,
        });
        news_id = write_news_result.dataValues.news_id;
        // #2. student_subscription_school에서 해당 school_id를 구독중인 student_id 가져오기
        let subscribing_student_list = await db.models.student_subscription_school.findAll({
            attributes: ['student_id'],
            where: {
                school_id: school_id,
                is_subscribed: true,
            },
            transaction: transaction,
        });
        if (subscribing_student_list.length) {
            // #3. loop: student_receives_newsfeed에서 (student_id, newsfeed_id) insert
            for (element of subscribing_student_list) {
                let student_id = element.dataValues.student_id;
                await db.models.student_receives_newsfeed.create({
                    student_id: student_id,
                    news_id: news_id,
                    transaction: transaction,
                })
            }
        }
        await transaction.commit();
        return res.status(200).json({
            status: 'success',
            message: 'Write news succeed',
            news_id: news_id,
        });
    } catch (error) {
        await transaction.rollback();
        if (error.name === 'SequelizeForeignKeyConstraintError') { // school_list에 없는 school_id를 사용할 때
            return res.status(400).json({
                status: 'InvalidParamError',
                message: 'invalid school_id'
            })
        }
        console.error(error)
        return res.status(500).json({
            status: 'InternalServerError',
            message: 'Server Error occurred',
        })
    }
}

const update_school_news = async (req, res) => {
    let {school_id, news_id} = req.params;
    let news_content = req.body.news_content;

    try {
        await db.models.school_news.update({
            school_id: school_id,
            news_content: news_content,
        },
        {
            where: {
                news_id: news_id,
            }
        });
        
        return res.status(200).json({
            status: 'success',
            message: 'update news succeed',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'InternalServerError',
            message: 'Server Error occurred',
        })
    }
}

const delete_school_news = async (req, res) => {
    let news_id = req.params.news_id;
    const transaction = await sequelize.transaction();
    try {
        await db.models.student_receives_newsfeed.destroy({
            where: {
                news_id: news_id,
            },
            transaction: transaction,
        });

        let destroy_result = await db.models.school_news.destroy({
            where: {
                news_id: news_id,
            },
            transaction: transaction,
        });
        await transaction.commit();

        if (!destroy_result) {
            return res.status(401).json({
                status: 'InvalidParamError',
                message: 'wrong news_id',
            });
            
        }

        return res.status(200).json({
            status: 'success',
            message: 'delete news succeed',
        });

    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({
            status: 'InternalServerError',
            message: 'Server Error occurred',
        })
    }
    
    
}

exports.publish_token = publish_token;
exports.enroll_school = enroll_school;
exports.write_school_news = write_school_news;
exports.update_school_news = update_school_news;
exports.delete_school_news = delete_school_news;