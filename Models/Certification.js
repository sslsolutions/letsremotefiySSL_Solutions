const {DataTypes, Model}= require('sequelize')
const sequelize=require('./index')

class Certification extends Model {

}

Certification.init({
    Certificate:{
        type:DataTypes.STRING,
        allowNull:false
        
    },
    Organization:{
        type:DataTypes.STRING,
        allowNull:false
        
    },
    Institute:{
        type:DataTypes.STRING,
        allowNull:false
        
    },
    StartYear:{
        type:DataTypes.DATE,
        allowNull:false
        
    },
    EndYear:{
        type:DataTypes.DATE,
        allowNull:false
        
    },
    Description:{
        type:DataTypes.STRING,
        allowNull:false
        
    },
} ,{
    sequelize,
    modelName: "Certification"
})

module.exports =Certification