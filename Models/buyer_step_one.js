const sequelize=require('./index')
const User = require('./User')
const {DataTypes, Model}= require('sequelize')

const user_skill_model = require('./user_skill_model')

class Buyer_Step_One extends Model{

}
Buyer_Step_One.init({
    timeLevel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startTime:{
        type:DataTypes.STRING,
        allowNull:false
    },
    talentExperience:{
        type:DataTypes.STRING,
        allowNull:false
    },
    numberOfEmployee:{
        type:DataTypes.STRING,
        allowNull:false
    },
    workEmail:{
        type:DataTypes.STRING,
        allowNull:false
    } ,
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    modelName: "Buyer_Step_One"
})

module.exports= Buyer_Step_One