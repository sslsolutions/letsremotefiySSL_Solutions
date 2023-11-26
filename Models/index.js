
const Sequelize=require('sequelize')
const sequelize = new Sequelize('shoamzwk_ssl_solutions', 'shoamzwk_ssl_group', 'qazxsw@!#', {
    host: 'localhost',
    dialect: 'mysql'
  });

try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

sequelize.sync({ alter: true });
module.exports= sequelize
