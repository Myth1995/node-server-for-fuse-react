const db = require("../models");
const { sequelize } = require('../models');
const User = db.users;
const App = db.apps;
const File = db.files;
const Ticket = db.tickets;
const Op = db.Sequelize.Op;

// Find a single User with an id
exports.count = async function(req, res) {
    try{
        const userCount = await User.count();
        const appCount = await App.count();
        const fileCount = await File.count();
        const ticketCount = await Ticket.count();

        // weekly chart info
        var start = new Date();
        start.setUTCHours(0,0,0,0);

        var end = new Date();
        end.setUTCHours(23,59,59,999);

        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));

        const chartinfo = await App.findAll({
            attributes: [
                [ sequelize.fn('weekday', sequelize.col('added_date')), 'weekday'],
                [ sequelize.fn('count', '*'), 'count']
            ],
            where: 
            {
                added_date: {
                    [Op.gt]: firstday,
                    [Op.lt]: lastday
                }
            },
            group: ['weekday']
        })
       

        res.json({
            user: userCount,
            app: appCount,
            file: fileCount,
            ticket: ticketCount,
            chart: chartinfo
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            message: "Error while getting count: " + err
        });
    }
};