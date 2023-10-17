const User = require('./User');
const sequelize = require('./index')
const { DataTypes, Model } = require('sequelize');
const user_skill_model = require('./user_skill_model');

class user_profile_seller extends Model {
static associations(model){
   // Specify the foreign key
}
}
user_profile_seller.init({


    Designation: {
        type: DataTypes.STRING,
        require: true
    },
    firstName: {
        type: DataTypes.STRING,
        require: true
    },
    lastName: {
        type: DataTypes.STRING,
        require: true
    },
    phoneNumber: {
        type: DataTypes.STRING, // Change the data type to String
        required: true,
    },
    country: {
        type: DataTypes.STRING,
        require: true
    },
    countryCode: {
        type: DataTypes.STRING,
        require: true
    },
    avatar: {
        type: DataTypes.STRING,
    },
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'user_profile_seller'
})

user_profile_seller.hasOne(user_skill_model)
module.exports = user_profile_seller
