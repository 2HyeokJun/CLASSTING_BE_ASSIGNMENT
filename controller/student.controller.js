const fn = require('../functions');
const db = require('../models/index');

const publish_token = async (req, res) => {
    let token = fn.publish_token('student');
    return res.status(200).json({
        access_token:token,
    });
}

const get_newsfeed_list = async (req, res) => {
    let school_id = req.params.school_id;
    let newsfeed_list = await db.models.school_newsfeed.findAll({
        where: {
            school_id: school_id,
        },
        order: {
            created_at,
        }
    });
    res.status(200).json({
        status: 'Success',
        newsfeed_list: newsfeed_list,
    });

}

const get_subscription_list = async (req, res) => {
    let student_id = req.query.student_id;
    let subscribed_school_id_list = await db.models.student_subscription_school.findAll({
        where: {
            student_id: student_id,
        },
        attributes: ['school_id'],
    })
    res.status(200).json({
        status: 'Success',
        subscription_school_list: subscribed_school_id_list,
    });
}


const subscribe_school = async (req, res) => {
    let {student_id, school_id} = req.body;
    try {
        db.models.student_subscription_school.create({
            student_id: student_id,
            school_id: school_id,
            subscribed_at: new Date(),
        }).then (result => console.log('result:', result))
    } catch (error) {
        console.error(error);
    }

    res.status(200).json({
        status: 'Success',
        message: 'subscribe succeed',
    });
}

const unsubscribe_school = async (req, res) => {
    let {student_id, school_id} = req.body;
    try {
        db.models.student_subscription_school.update({
            unsubscribed_at: new Date(),
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
        status: 'Success',
        message: 'unsubscribe succeed',
    });
}


exports.publish_token = publish_token;
exports.get_newsfeed_list = get_newsfeed_list;
exports.get_subscription_list = get_subscription_list;
exports.subscribe_school = subscribe_school;
exports.unsubscribe_school = unsubscribe_school;
