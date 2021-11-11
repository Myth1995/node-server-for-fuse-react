const db = require("../models");
const User = db.users;
const App = db.apps;
const File = db.files;
const Ticket = db.tickets;
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
                    },
                    detail: 'You can show some detailed information about this widget in here.'
                };
                result.push(result_app);
                
                File.count()
                  .then(data => {
                      const result_file = {
                        id: 'widget3',
                        title: 'Files',
                        data: {
                            name: 'Total uploaded files',
                            count: data,
                        },
                        detail: 'You can show some detailed information about this widget in here.'
                      }
                      result.push(result_file);

                      Ticket.count()
                        .then(data => {
                            const result_ticket = {
                                id: 'widget4',
                                title: 'Tickets',
                                data: {
                                    name: 'Total received tickets',
                                    count: data,
                                },
                                detail: 'You can show some detailed information about this widget in here.'
                              }
                            result.push(result_ticket);
                            res.json(result);
                        })
                        .catch(err=>{
                            console.log(err);
                            res.status(500).send({
                                message: "Error retrieving ticket count"
                            });
                        })
                      
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).send({
                        message: "Error retrieving file count"
                    });
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                message: "Error retrieving app count"
                });
            });
       
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message: "Error retrieving user count"
        });
      });
};