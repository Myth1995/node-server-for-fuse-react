module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define('ticket', {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ticket_id: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    });
    return Ticket;
}