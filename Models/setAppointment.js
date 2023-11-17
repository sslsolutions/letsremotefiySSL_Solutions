const sequelize =require('./index')
const {DataTypes, Model}=require('sequelize')

class Appointment extends Model{

}
 
Appointment.init({
    Date:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    Time:{
        type:DataTypes.TIME,
        allowNull:false
    },
    TimeZone:{
        type:DataTypes.STRING,
        allowNull:false
    }
})