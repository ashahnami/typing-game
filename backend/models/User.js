const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import the Sequelize instance

const User = sequelize.define(
  'User', 
  {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    }
});

(async () => {
  await sequelize.sync({ force: true });
})();

module.exports = User;
