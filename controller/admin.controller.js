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
    try {
        db.models.school_list.create({
            school_region: school_region,
            school_name: school_name,
        }).then (result => console.log('result:', result))
    } catch (error) {
        console.error(error);
    }
    
    res.status(200).json({
        status: 'Success',
        message: 'Enroll succeed',
    });
}

const write_newsfeed = async (req, res) => {
    let {school_id, newsfeed_content} = req.body;
    try {
        db.models.school_newsfeed.create({
            school_id: school_id,
            newsfeed_content: newsfeed_content,
        }).then (result => console.log('result:', result))
    } catch (error) {
        console.error(error);
    }
    
    res.status(200).json({
        status: 'Success',
        message: 'Write newfeeed succeed',
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
        status: 'Success',
        message: 'update newfeeed succeed',
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
        status: 'Success',
        message: 'delete newfeeed succeed',
    });

}

exports.publish_token = publish_token;
exports.return_hello  = return_hello;
exports.enroll_school = enroll_school;
exports.write_newsfeed = write_newsfeed;
exports.update_newsfeed = update_newsfeed;
exports.delete_newsfeed = delete_newsfeed;