


const sequelize = require('./index');
const { DataTypes, Model } = require('sequelize');
const user_profile_seller = require('./user_profile_seller_models');
class user_skill_model extends Model {
    static associations(model) {
  
    }
}

 user_skill_model.init({
    
    Role:{
        type: DataTypes.STRING,
        require: true
    },
    Resume:{
        type: DataTypes.STRING,
        require:true
    },
    Experiences:{
        type: DataTypes.STRING,
        require:true
    },
    platform:{
        type: DataTypes.STRING,
        require:true
    },
    language:{
        type: DataTypes.STRING,
        require:true
    },
    skills:{
        type: DataTypes.JSON(DataTypes.ARRAY),
        allowNull: false, 
        defaultValue: []
    },
    SalaryExpetations:{
        type: DataTypes.STRING,
        require
    },
   
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'user_skill_model' // We need to choose the model name
})

module.exports= user_skill_model