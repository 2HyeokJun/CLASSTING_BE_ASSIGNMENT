const fn = require('../functions');
const db = require('../models/index');

const publish_token = async (req, res) => {
    let token = fn.publish_token('student');
    return res.status(200).json({
        access_token:token,
    });
}

const get_school_news_list = async (req, res) => {
    let school_id = req.params.school_id;
    let newsfeed_list = await db.models.school_newsfeed.findAll({
        attributes: ['newsfeed_id', 'newsfeed_content', 'created_at', 'updated_at'],

        where: {
            school_id: school_id,
        },
        order: [
            ['created_at', 'DESC']
        ]
    });

    res.status(200).json({
        status: 'success',
        newsfeed_list: newsfeed_list,
    });

} 

const get_subscription_list = async (req, res) => {
    let student_id = req.query.student_id;
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
    let {student_id, school_id} = req.body;
    try {
        db.models.student_subscription_school.create({
            student_id: student_id,
            school_id: school_id,
            is_subscribed: true,
        }).then (result => console.log('result:', result))
    } catch (error) {
        console.error(error);
    }

    res.status(200).json({
        status: 'success',
        message: 'subscribe succeed',
    });
}

const unsubscribe_school = async (req, res) => {
    let {student_id, school_id} = req.body;
    try {
        db.models.student_subscription_school.update({
            is_subscribed: false,
        },
        {
            where: {
                student_id: student_id,
                school_id: school_id,
            }
        }).then (result => console.log('result:', result))
    } catch (error) {
        console.error(error);
    }

    res.status(200).json({
        status: 'success',
        message: 'unsubscribe succeed',
    });
}

const get_newsfeed_list = async (req, res) => {
    let student_id = req.query.student_id;
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