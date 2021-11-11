module.exports = (sequelize, Sequelize) => {
    const App = sequelize.define("application", {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      uni_id: {
        type: Sequelize.INTEGER
      },
      pro_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return App;
  };
  