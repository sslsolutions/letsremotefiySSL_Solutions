const User = require('./User')
const {DataTypes, Model}= require('sequelize')
const sequelize=require('./index')
const user_skill_model = require('./user_skill_model')
const Buyer_Step_One = require('./buyer_step_one')

class Buyer_Demanded_Skill extends Model{

}

Buyer_Demanded_Skill.init({

    desiredSkill: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    desiredRole:{
        type:DataTypes.JSON(DataTypes.ARRAY),
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
Buyer_Demanded_Skill.hasOne(Buyer_Step_One)
module.exports= Buyer_Demanded_Skill