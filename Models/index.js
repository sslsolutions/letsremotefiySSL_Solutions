
const Sequelize=require('sequelize')
const sequelize = new Sequelize('ssl_solutions', 'root', '', {
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
