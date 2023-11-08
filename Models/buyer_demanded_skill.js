const User = require('./User')
const {DataTypes, Model}= require('sequelize')
const sequelize=require('./index')
const user_skill_model = require('./user_skill_model')

class Buyer_Demanded_Skill extends Model{

}

Buyer_Demanded_Skill.init({

    desiredSkill:{
        type:DataTypes.JSON(DataTypes.ARRAY(DataTypes.STRING)),
        allowNull:false
    },
    desiredRole:{
        type:DataTypes.JSON(DataTypes.ARRAY(DataTypes.STRING)),
        allowNull:false
    },
    fullName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    companyName:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    modelName: "buyerdemandedskills"
})

module.exports= Buyer_Demanded_Skill