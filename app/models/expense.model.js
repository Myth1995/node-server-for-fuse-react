module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define('expense', {
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
        receipt: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    return Expense;
}