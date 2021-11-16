const moment = require('moment');
const { sequelize } = require('../models');
const db = require("../models");
const Income = db.incomes;
const Expense = db.expenses;
const RecuringExpense = db.recuringExpenses;
const Op = db.Sequelize.Op;

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
      type: data["expense_type"],
      name: data["name"],
      currency: data["currency"],
      amount: data["amount"],
      date: data["expense_date"],
      receipt: data["expense_receipt"]
  });
  expense.save();
  return;
};

exports.add_recuring_expense = (req, res) => {
  data = req.body.data["newRecuringExpense"]
  const recuringExpense = RecuringExpense.build({
      type: data["type"],
      name: data["name"],
      currency: data["currency"],
      amount: data["amount"],
      date: data["date"],
  });
  recuringExpense.save();
  return;
};