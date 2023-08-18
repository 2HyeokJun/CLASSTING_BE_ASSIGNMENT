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
        attributes: ['news_id', 'news_content', 'created_at', 'updated_at'],
        where: {
            school_id: school_id,
        },
        order: [
            ['created_at', 'DESC']
        ],
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
    if (subscribed_school_list.length) {
        for (element of subscribed_school_list) {
            subscription_school_list.push(element.school_list.dataValues);
        }

    }
    

    res.status(200).json({
        status: 'success',
        subscription_school_list: subscription_school_list,
    });
}

const subscribe_school = async (req, res) => {
    let {student_id, subscription_history} = req;
    let school_id = req.params.school_id;
    let is_subscribed = req.method === 'POST' ? true : false;
    try {
        if (!subscription_history.before_subscribed) { // 구독 이력 없음
            await db.models.student_subscription_school.create({
                student_id: student_id,
                school_id: school_id,
                is_subscribed: is_subscribed,
            });
        }
        else { // 기존에 구독중
            await db.models.student_subscription_school.update({
                is_subscribed: is_subscribed,
            }, {
                where: {
                    student_id: student_id,
                    school_id: school_id,
                } 
            });
        }

        let success_message = is_subscribed? 'subscribe succeed' : 'unsubscribe succeed';
        return res.status(200).json({
            status: 'success',
            message: success_message,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'InternalServerError',
            message: 'Server Error occured',
        })
    }
}

const get_newsfeed_list = async (req, res) => {
    let student_id = req.student_id;
    try {
        let my_newsfeed_list = await db.models.student_receives_newsfeed.findAll({
            where: {
                student_id: student_id,
            },
            attributes: ['news_id'],
            include: [{
                model: db.models.school_news,
                attributes: ['news_content', 'created_at', 'updated_at'],
            }],
            order: [
                [db.models.school_news, 'created_at', 'DESC']
            ]
        });
    
        my_newsfeed_list = JSON.parse(JSON.stringify(my_newsfeed_list));
        my_newsfeed_list.forEach((element, index) => {
            element.newsfeed_id = my_newsfeed_list.length - index - 1;
            element.news_content = element.school_new.news_content;
            element.created_at = element.school_new.created_at;
            element.updated_at = element.school_new.updated_at;
            delete element.school_new;
    
        })
        res.status(200).json({
            status: 'success',
            newsfeed_list: my_newsfeed_list,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'InternalServerError',
            message: 'Server Error occured',
        })

    }
    
}


exports.publish_token = publish_token;
exports.get_newsfeed_list = get_newsfeed_list;
exports.get_subscription_list = get_subscription_list;
exports.subscribe_school = subscribe_school;
exports.get_school_news_list = get_school_news_list;