module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const dashboard = require("../controllers/dashboard.controller.js");
  const chart = require("../controllers/chart.controller.js");
  const finance = require("../controllers/finance.controller.js");

  var router = require("express").Router();

  // Get kinds of count
  router.get("/dashboard", dashboard.get_info);

  router.get("/chart", chart.chart_info);

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve all published Users
  router.get("/published", users.findAllPublished);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete a User with id
  router.delete("/user/:id", users.delete);

  // Delete all Users
  router.delete("/", users.deleteAll);

  // Get finance statements
  router.get("/finance/statements", finance.get_statements);

  // Add income
  router.post("/finance/add-income", finance.add_income);

  // Add expense
  router.post("/finance/add-expense", finance.add_expense);

  // Add recuring expense
  router.post("/finance/add-recuring-expense", finance.add_recuring_expense);

  app.use('/api/', router);
};
