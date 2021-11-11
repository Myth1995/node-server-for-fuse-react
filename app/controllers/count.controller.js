const db = require("../models");
const User = db.users;
const App = db.apps;
const Op = db.Sequelize.Op;

// Find a single User with an id
exports.count = (req, res) => {
    User.count()
      .then(data => {
        const result = [];
        // console.log(data);
        const result_user = {
          id: 'widget1',
          title: 'Users',
          data: {
            name: 'Total signed users',
            count: data,
            // extra: {
            //   name: "Yesterday's overdue",
            //   count: 2
            // }
          },
          detail: 'You can show some detailed information about this widget in here.'
        }
        console.log(result_user);
        result.push(result_user);
        
        App.count()
            .then(data=>{
                const result_app = {
                    id: 'widget2',
                    title: 'Applications',
                    data: {
                        name: 'Total registered applications',
                        count: data,
                        // extra: {
                        // 	name: "Yesterday's overdue",
                        // 	count: 2
                        // }
                    },
                    detail: 'You can show some detailed information about this widget in here.'
                };
                result.push(result_app);
                res.json(result);
            })
            .catch(err => {
                console.log(err);
                suc_flag = false;
                res.status(500).send({
                message: "Error retrieving user count"
                });
            });
       
      })
      .catch(err => {
        console.log(err);
        suc_flag = false;
        res.status(500).send({
          message: "Error retrieving user count"
        });
      });
};