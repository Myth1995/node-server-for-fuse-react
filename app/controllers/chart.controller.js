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

    App.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        where: sequelize.where(sequelize.fn('date', sequelize.col('added_date')), '<=', end),
        // {
            // added_date: {
            //     [Op.gt]: start,
            //     [Op.lt]: end
            // }
        // },
        group: ['added_date']
    })
    .then(data=>{
        const series = {
            "This week": [
                {
                    name: 'Sales',
                    data: [1.9, 3, 3.4, 2.2, 2.9, 3.9, 2.5],
                    fill: 'start'
                }
            ]
        };
        console.log(data.length);
        // res.send(data);
    })
};