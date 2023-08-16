const fn = require('../functions');
const db = require('../models/index');

const publish_token = async (req, res) => {
    let student_id = req.params.student_id ? req.params.student_id : 1;
    let token = fn.publish_token('student', student_id);
    return res.status(200).json({
        access_token:token,
    });
}

const get_school_news_list = async (req, res) => {
    let school_id = req.params.school_id;
    let news_list = await db.models.school_news.findAll({
        attributes: ['news_id', 'created_at', 'updated_at'],
        where: {
            school_id: school_id,
        },
        order: [
            ['created_at', 'DESC']
        ]
    });

    res.status(200).json({
        status: 'success',
        news_list: news_list,
    });
} 

const get_subscription_list = async (req, res) => {
    let student_id = req.student_id;
    let subscribed_school_list = await db.models.student_subscription_school.findAll({
        where: {
            student_id: student_id,
            is_subscribed: true,
        },
        attributes: [],
        include: [{
            model: db.models.school_list,
            attributes: ['school_region', 'school_name']
        }]
    })

    let subscription_school_list = [];
    for (element of subscribed_school_list) {
        subscription_school_list.push(element.school_list.dataValues);
    }

    res.status(200).json({
        status: 'success',
        subscription_school_list: subscription_school_list,
    });
}

const subscribe_school = async (req, res) => {
    let student_id = req.student_id;
    let school_id = req.body.school_id;
    try {
        let create_result = await db.models.student_subscription_school.create({
            student_id: student_id,
            school_id: school_id,
            is_subscribed: true,
        });
        if (create_result) {
            return res.status(200).json({
                status: 'success',
                message: 'subscribe succeed',
            });
        }
    } catch (error) {
        let error_type = error.errors[0].type;
        let error_message = error.errors[0].message;
        if (error_type === 'unique violation' && error_message === 'PRIMARY must be unique') {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'You already subscribed that school',
            })
        }

        return res.status(500).json({
            error: 'InternalServerError',
            message: 'Server Error occured',
        })
    }
}

const unsubscribe_school = async (req, res) => {
    let student_id = req.student_id;
    let school_id = req.params.school_id;
    try {
        await db.models.student_subscription_school.update({
            is_subscribed: false,
        },
        {
            where: {
                student_id: student_id,
                school_id: school_id,
            }
        });

        return res.status(200).json({
            status: 'success',
            message: 'unsubscribe succeed',
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'InternalServerError',
            message: 'Server Error occured',
        })
    }
}

// TODO:
const get_newsfeed_list = async (req, res) => {
    let student_id = req.student_id;
    let my_newsfeed_list = await db.models.student_receives_newsfeed.findAll({
        where: {
            student_id: student_id,
        },
        attributes: [],
        include: [{
            model: db.models.school_newsfeed,
            attributes: ['newsfeed_content', 'created_at', 'updated_at'],
        }],
        order: [
            [db.models.school_newsfeed, 'updated_at', 'DESC']
        ]
    });
    console.log(my_newsfeed_list)

    my_newsfeed_list = JSON.parse(JSON.stringify(my_newsfeed_list));
    for (element of my_newsfeed_list) {
        element.newsfeed_content = element.school_newsfeed.newsfeed_content;
        element.created_at = element.school_newsfeed.created_at;
        element.updated_at = element.school_newsfeed.updated_at;
        delete element.school_newsfeed;
    }

    res.status(200).json(my_newsfeed_list);
}


exports.publish_token = publish_token;
exports.get_newsfeed_list = get_newsfeed_list;
exports.get_subscription_list = get_subscription_list;
exports.subscribe_school = subscribe_school;
exports.unsubscribe_school = unsubscribe_school;
exports.get_school_news_list = get_school_news_list;