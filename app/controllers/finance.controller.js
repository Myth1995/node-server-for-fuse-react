const moment = require('moment');
const { sequelize } = require('../models');
const db = require("../models");
const Income = db.incomes;
const Expense = db.expenses;
const RecuringExpense = db.recuringExpenses;
const Op = db.Sequelize.Op;

exports.get_statements = async function(req, res) {
  try {
    // Get Statements of last month(income, expense, remain)
    var curr = new Date; // get current date
    //get firstday and lastday of previous month
    var firstDay = new Date(curr.getFullYear(), curr.getUTCMonth() - 1, 1);
    var lastDay = new Date(curr.getFullYear(), curr.getUTCMonth(), 0);
        
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    prev_month_day = monthNames[lastDay.getMonth()] + " " + (lastDay.getUTCDate()-1) + " " + lastDay.getFullYear();
    
    const income_prev_month = await Income.findAll({
        attributes: [
            [ sequelize.fn('sum', sequelize.col('amount')), 'cnt']
        ],
        where: 
        {
            date: {
                [Op.gte]: firstDay,
                [Op.lte]: lastDay
            }
        },
    })

    const expense_prev_month = await Expense.findAll({
      attributes: [
          [ sequelize.fn('sum', sequelize.col('amount')), 'cnt']
      ],
      where: 
      {
          date: {
              [Op.gte]: firstDay,
              [Op.lte]: lastDay
          }
      },
    })

    // Get Statements of this month(income, expense, remain)
    curr = new Date; // get current date
    //get firstday and lastday of previous month
    firstDay = new Date(curr.getFullYear(), curr.getMonth(), 1);
    lastDay = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    this_month_day = monthNames[lastDay.getMonth()] + " " + (lastDay.getUTCDate()-1) + " " + lastDay.getFullYear();
    
    const income_this_month = await Income.findAll({
        attributes: [
            [ sequelize.fn('sum', sequelize.col('amount')), 'cnt']
        ],
        where: 
        {
            date: {
                [Op.gte]: firstDay,
                [Op.lte]: lastDay
            }
        },
    })
    //Expense on this month
    const expense_this_month = await Expense.findAll({
      attributes: [
          [ sequelize.fn('sum', sequelize.col('amount')), 'cnt']
      ],
      where: 
      {
          date: {
              [Op.gte]: firstDay,
              [Op.lte]: lastDay
          }
      },
    })

    //Get Income and expense by month in this year
    let thisYD1 = new Date(new Date().getFullYear(), 0, 1);
    let thisYD2 = new Date(new Date().getFullYear()+1, 0, 1);
    const income_by_month_this_year = await Income.findAll({
      attributes: [
          [ sequelize.fn('sum', sequelize.col('amount')), 'cnt'],
          [ sequelize.fn('month', sequelize.col('date')), 'month']
      ],
      where: 
      {
          date: {
              [Op.gte]: thisYD1,
              [Op.lte]: thisYD2
          }
      },
      group: ['month']
    })

    const expense_by_month_this_year = await Expense.findAll({
      attributes: [
          [ sequelize.fn('sum', sequelize.col('amount')), 'cnt'],
          [ sequelize.fn('month', sequelize.col('date')), 'month']
      ],
      where: 
      {
          date: {
              [Op.gte]: thisYD1,
              [Op.lte]: thisYD2
          }
      },
      group: ['month']
    })

    //Get Income by month in last year
    let lastD1 = new Date(new Date().getFullYear()-1, 0, 1);
    let lastD2 = new Date(new Date().getFullYear(), 0, 1);
    const income_by_month_last_year = await Income.findAll({
      attributes: [
          [ sequelize.fn('sum', sequelize.col('amount')), 'cnt'],
          [ sequelize.fn('month', sequelize.col('date')), 'month']
      ],
      where: 
      {
          date: {
              [Op.gte]: lastD1,
              [Op.lte]: lastD2
          }
      },
      group: ['month']
    })

    const expense_by_month_last_year = await Expense.findAll({
      attributes: [
          [ sequelize.fn('sum', sequelize.col('amount')), 'cnt'],
          [ sequelize.fn('month', sequelize.col('date')), 'month']
      ],
      where: 
      {
          date: {
              [Op.gte]: lastD1,
              [Op.lte]: lastD2
          }
      },
      group: ['month']
    })

    const salary_expense_by_month_this_year = await RecuringExpense.findAll({
      attributes: [
          [ sequelize.fn('sum', sequelize.col('amount')), 'cnt'],
          [ sequelize.fn('month', sequelize.col('date')), 'month']
      ],
      where: 
      {
          date: {
              [Op.gte]: thisYD1,
              [Op.lte]: thisYD2
          },
          type: {
            [Op.eq]: 1    // Salary
          }
      },
      group: ['month']
    })

    const salary_expense_by_month_last_year = await RecuringExpense.findAll({
      attributes: [
          [ sequelize.fn('sum', sequelize.col('amount')), 'cnt'],
          [ sequelize.fn('month', sequelize.col('date')), 'month']
      ],
      where: 
      {
          date: {
              [Op.gte]: lastD1,
              [Op.lte]: lastD2
          },
          type: {
            [Op.eq]: 1    // Salary
          }
      },
      group: ['month']
    })

    res.json({
      payday_prev_month: prev_month_day,
      income_prev_month: income_prev_month,
      expense_prev_month: expense_prev_month,
      payday_this_month: this_month_day,
      income_this_month: income_this_month,
      expense_this_month: expense_this_month,
      income_by_month_this_year: income_by_month_this_year,
      income_by_month_last_year: income_by_month_last_year,
      expense_by_month_this_year: expense_by_month_this_year,
      expense_by_month_last_year: expense_by_month_last_year,
      salary_expense_by_month_this_year: salary_expense_by_month_this_year,
      salary_expense_by_month_last_year: salary_expense_by_month_last_year,
    });
  }
  catch(err){
    console.log(err);
    res.status(500).send({
        message: "Error while getting count: " + err
    });
  }
}

exports.add_income = (req, res) => {
    data = req.body.data["newIncome"]
    console.log(data);
    const income = Income.build({
        incomeType: data["incomeType"],
        orgName: data["orgName"],
        studentName: data["studentName"],
        cashType: data["cashType"],
        feeType: data["feeType"],
        currency: data["currency"],
        commissionType: data["commissionType"],
        amount: data["amount"],
        date: data["date"],
        receipt: data["receipt"]
    });
    income.save();
    return;
    res.send(data);
};

exports.add_expense = (req, res) => {
  data = req.body.data["newExpense"]
  const expense = Expense.build({
      type: data["expenseType"],
      orgName: data["orgName"],
      studentName: data["studentName"],
      currency: data["currency"],
      amount: data["amount"],
      date: data["date"],
      receipt: data["receipt"],
      purpose: data["purpose"],
      reason: data["reason"]
  });
  expense.save();
  return;
};

exports.add_recuring_expense = (req, res) => {
  data = req.body.data["newRecuringExpense"]
  console.log(data);
  const recuringExpense = RecuringExpense.build({
      type: data["type"],
      name: data["name"],
      currency: data["currency"],
      amount: data["amount"],
      date: data["date"],
      salaryType: data["salaryType"],
      officeExpensesType: data["officeExpensesType"],
      rentType: data["rentType"],
      otherType: data["otherType"],
      purpose: data["purpose"]
  });
  recuringExpense.save();
  return;
};