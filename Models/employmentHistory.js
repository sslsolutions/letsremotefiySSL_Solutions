const { DataTypes, Model } = require('sequelize')
const sequelize = require('./index')
const User=require('./User')
class EmploymentHistory extends Model {

}

EmploymentHistory.init({

    Position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    StartDate:{
        type:DataTypes.DATEONLY
    },
    EndDate:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    Description:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    modelName: "EmploymentHistory"
})

module.exports=EmploymentHistory