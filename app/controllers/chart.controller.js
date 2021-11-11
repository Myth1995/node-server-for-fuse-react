const moment = require('moment');
const { sequelize } = require('../models');
const db = require("../models");
const App = db.apps;
const Op = db.Sequelize.Op;

exports.chart_info = (req, res) => {
    
    var start = new Date();
    start.setUTCHours(0,0,0,0);

    var end = new Date();
    end.setUTCHours(23,59,59,999);

    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));

    App.findAll({
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
    .then(data=>{
        const series = [
                {
                    name: 'Sales',
                    data: [1.9, 3, 3.4, 2.2, 2.9, 3.9, 2.5],
                    fill: 'start'
                }
            ];

        series[0].data[data[0].dataValues.weekday] = data[0].dataValues.count;
        console.log(data[0].dataValues.weekday);
        // res.send(data);
    })
};