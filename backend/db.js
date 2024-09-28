const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('typinggame', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

async () => {
try {
    await sequelize.authenticate();
    console.log('Successfully connected to database');   
} catch (error) {
    console.log('Unable to connect to database', error);
}}

module.exports = sequelize;