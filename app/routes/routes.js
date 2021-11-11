module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const count = require("../controllers/count.controller.js");
  const chart = require("../controllers/chart.controller.js");

  var router = require("express").Router();

  // Get kinds of count
  router.get("/count/user", count.count);

  router.get("/chart", chart.chart_info);

  // Create a new Tutorial
  router.post("/", users.create);

  // Retrieve all Tutorials
  router.get("/", users.findAll);

  // Retrieve all published Tutorials
  router.get("/published", users.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);

  // Update a Tutorial with id
  router.put("/:id", users.update);

  // Delete a Tutorial with id
  router.delete("/:id", users.delete);

  // Delete all Tutorials
  router.delete("/", users.deleteAll);

  app.use('/api/', router);
};
