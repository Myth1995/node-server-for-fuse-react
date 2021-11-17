module.exports = (sequelize, Sequelize) => {
    const recuringExpense = sequelize.define('recuringexpense', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        currency: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.DOUBLE
        },
        date: {
            type: Sequelize.DATE
        },
        purpose: {
            type: Sequelize.STRING
        },
        salaryType: {
            type: Sequelize.STRING
        },
        officeExpensesType: {
            type: Sequelize.STRING
        },
        rentType: {
            type: Sequelize.STRING
        },
        otherType: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    return recuringExpense;
}