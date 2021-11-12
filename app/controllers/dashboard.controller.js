const db = require("../models");
const { sequelize } = require('../models');
const User = db.users;
const App = db.apps;
const File = db.files;
const Ticket = db.tickets;
const Op = db.Sequelize.Op;


exports.get_info = async function(req, res) {
    try{
        const userCount = await User.count();
        const appCount = await App.count();
        const fileCount = await File.count();
        const ticketCount = await Ticket.count();

        //chart info
        //This week
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var f1 = new Date(curr.setDate(first));
        var l1 = new Date(curr.setDate(last));

        const chart_app_this_week = await App.findAll({
            attributes: [
                [ sequelize.fn('weekday', sequelize.col('added_date')), 'weekday'],
                [ sequelize.fn('count', '*'), 'count']
            ],
            where: 
            {
                added_date: {
                    [Op.gt]: f1,
                    [Op.lt]: l1
                }
            },
            group: ['weekday']
        })

        // last week
        var ago = new Date(curr.getTime() - (7 * 24 * 3600 * 1000));
        var first = ago.getDate() - ago.getDay(); // First day is the day of the month - the day of the week
        var f2 = new Date(curr.setDate(first));
        var l2 = new Date(f2.getTime() + (6 * 24 * 3600 * 1000 ));
        
        const chart_app_last_week = await App.findAll({
            attributes: [
                [ sequelize.fn('weekday', sequelize.col('added_date')), 'weekday'],
                [ sequelize.fn('count', '*'), 'count']
            ],
            where: 
            {
                added_date: {
                    [Op.gt]: f2,
                    [Op.lt]: l2
                }
            },
            group: ['weekday']
        })

        // 2 week ago
        ago = new Date(curr.getTime() - (14 * 24 * 3600 * 1000));
        first = ago.getDate() - ago.getDay(); // First day is the day of the month - the day of the week
        var f3 = new Date(curr.setDate(first));
        var l3 = new Date(f3.getTime() + (6 * 24 * 3600 * 1000 ));
        
        const chart_app_two_week = await App.findAll({
            attributes: [
                [ sequelize.fn('weekday', sequelize.col('added_date')), 'weekday'],
                [ sequelize.fn('count', '*'), 'count']
            ],
            where: 
            {
                added_date: {
                    [Op.gt]: f3,
                    [Op.lt]: l3
                }
            },
            group: ['weekday']
        })
       

        res.json({
            user: userCount,
            app: appCount,
            file: fileCount,
            ticket: ticketCount,
            chart_app_this_week: chart_app_this_week,
            chart_app_last_week: chart_app_last_week,
            chart_app_two_week: chart_app_two_week
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            message: "Error while getting count: " + err
        });
    }
};