module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    activate: {
      type: Sequelize.INTEGER
    },
    completed: {
      type: Sequelize.INTEGER
    }
  });

  return User;
};
