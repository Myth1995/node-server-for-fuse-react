module.exports = (sequelize, Sequelize) => {
    const Income = sequelize.define('income', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        incomeType: {
            type: Sequelize.INTEGER
        },
        orgName: {
            type: Sequelize.STRING
        },
        studentName: {
            type: Sequelize.STRING
        },
        cashType: {
            type: Sequelize.STRING
        },
        feeType: {
            type: Sequelize.STRING
        },
        commissionType: {
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
    return Income;
}