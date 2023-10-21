const {DataTypes, Model}=require('sequelize')
const sequelize=require('./index')

class UserEducationHistory extends Model{

}


UserEducationHistory.init({

    Degree: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Field: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Institute: {
        type: DataTypes.STRING,
        allowNull: false
    },
    StartYear:{
        type:DataTypes.DATEONLY
    },
    EndYear:{
        type:DataTypes.DATEONLY,
        allowNull:false
    }
}, {
    sequelize,
    modelName: "UserEducationHistory"
})



module.exports =UserEducationHistory