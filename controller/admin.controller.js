const fn = require('../functions');
const db = require('../models/index');

const publish_token = async (req, res) => {
    let token = fn.publish_token('admin');
    res.status(200).json({
        access_token:token,
    });
}

const enroll_school = async (req, res) => {
    let {school_region, school_name} = req.body;
    let enroll_school_result = await db.models.school_list.create({
            school_region: school_region,
            school_name: school_name,
    });
    console.log(enroll_school_result);
    
    
    res.status(200).json({
        status: 'success',
        message: 'Enroll succeed',
    });
}

const write_newsfeed = async (req, res) => {
    let {school_id, newsfeed_content} = req.body;
    let newsfeed_id;
    try {
        let write_newsfeed_result = await db.models.school_newsfeed.create({
            school_id: school_id,
            newsfeed_content: newsfeed_content,
        });
        newsfeed_id = write_newsfeed_result.dataValues.newsfeed_id;

        let subscribing_student_list = await db.models.student_subscription_school.findAll({
            attributes: ['student_id'],
            where: {
                school_id: school_id,
    
            }
        });
        for (element of subscribing_student_list) {
            let student_id = element.dataValues.student_id;
            console.log(student_id, newsfeed_id)
            await db.models.student_receives_newsfeed.create({
                student_id: student_id,
                newsfeed_id: newsfeed_id,
            })
        }        
    } catch (error) {
        console.error(error);
    }
    
    res.status(200).json({
        status: 'success',
        message: 'Write newsfeed succeed',
        newsfeed_id: newsfeed_id,
    });
}

const update_newsfeed = async (req, res) => {
    let newsfeed_id = req.params.id;
    let {school_id, newsfeed_content} = req.body;

    try {
        db.models.school_newsfeed.update({
            school_id: school_id,
            newsfeed_content: newsfeed_content,
        },
        {
            where: {    newsfeed_id: newsfeed_id,   }
        }).then (result => console.log('result:', result))
    } catch (error) {
        console.error(error);
    }
    
    res.status(200).json({
        status: 'success',
        message: 'update newsfeed succeed',
    });
}

const delete_newsfeed = async (req, res) => {
    let newsfeed_id = req.params.id;
    try {
        db.models.school_newsfeed.destroy({
            where: {
                newsfeed_id: newsfeed_id,
            }
        }).then (result => console.log('result:', result))
    } catch (error) {
        console.error(error);
    }
    
    res.status(200).json({
        status: 'success',
        message: 'delete newsfeed succeed',
    });
}

const get_student_who_subscribes = async (req, res) => {
    let school_id = req.query.school_id;
    

    res.status(200).json(subscribing_student_list)
}

exports.publish_token = publish_token;
exports.enroll_school = enroll_school;
exports.write_newsfeed = write_newsfeed;
exports.update_newsfeed = update_newsfeed;
exports.delete_newsfeed = delete_newsfeed;
exports.get_student_who_subscribes = get_student_who_subscribes;