
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
  // sequelize.sync({ alter: true });
>>>>>>> 3b1fe814d2ede77af73168688b71ddf62ebecf15
module.exports= sequelize
