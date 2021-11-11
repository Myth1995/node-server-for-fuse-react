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
    telephone: {
      type: Sequelize.STRING
    },
    family_name: {
      type: Sequelize.STRING
    },
    given_name: {
      type: Sequelize.STRING
    },
    birthday: {
      type: Sequelize.STRING
    },
    completed: {
      type: Sequelize.INTEGER
    }
  });

  return User;
};
