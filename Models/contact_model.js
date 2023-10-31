const sequelize=require('./index')
const { DataTypes, Model } = require('sequelize');

 class ContactScheme extends Model{

}

ContactScheme.init({
    name: {
        type:DataTypes.STRING,
        require: true
    },
    email: {
        type:DataTypes.STRING,
        require: true
    },
   
    message: {
        type:DataTypes.STRING,
        require: true
    },
    Inquiry: {
        type:DataTypes.STRING,
        require: true
    }
},{
    sequelize, // We need to pass the connection instance
    modelName: 'ContactSchema' 
})

module.exports=ContactScheme