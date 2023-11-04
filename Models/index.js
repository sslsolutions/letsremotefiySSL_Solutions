
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

<<<<<<< HEAD
 sequelize.sync({ alter: true });
=======
// sequelize.sync({ force: true });
>>>>>>> b81f6f2692c697dd2b33ccea20d285be453a9b38
module.exports= sequelize
