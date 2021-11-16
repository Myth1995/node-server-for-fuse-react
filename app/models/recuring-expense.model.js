module.exports = (sequelize, Sequelize) => {
    const recuringExpense = sequelize.define('recuringExpense', {
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
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    return recuringExpense;
}