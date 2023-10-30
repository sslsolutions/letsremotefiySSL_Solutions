const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index');
const user_skill_model = require('./user_skill_model');

class user_profile_seller extends Model {
    // Define your user_profile_seller model here
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
        type: DataTypes.STRING,
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
    descriptions: {
        type: DataTypes.STRING,
        require: true,
        defaultValue:"Add Descriptions"
    },
    avatar: {
        type: DataTypes.TEXT('long'),
    },
}, {
    sequelize,
    modelName: 'user_profile_sellers'
});

// Create the association with user_skill_model
user_profile_seller.hasOne(user_skill_model)

module.exports = user_profile_seller
