const sequelize = require('./index');
const { DataTypes, Model } = require('sequelize');
const user_profile_seller = require('./user_profile_seller_models');
const crypto = require('crypto');
const EmploymentHistory = require('./employmentHistory');
const UserEducationHistory = require('./userEducationHistory');
const Certification = require('./Certification');

class User extends Model {
    static associations(model) {
      
    }
    createResetPasswordToken() {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
        console.log(resetToken, this.passwordResetToken);
        return resetToken;
    };
}

User.init({
    // Model attributes are defined here
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roles: {
        type: DataTypes.STRING,
        ENUM: ['Seller', 'Buyer']
    },
    token: {
        type: DataTypes.STRING,
    },
    passwordChangeAt: {
        type: DataTypes.DATE
    },
    passwordResetToken: {
        type: DataTypes.STRING
    },
    passwordResetTokenExpires: {
        type: DataTypes.DATE
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Users' // We need to choose the model name
});

User.hasOne(user_profile_seller);
User.hasOne(EmploymentHistory)
User.hasOne(UserEducationHistory)
User.hasOne(Certification)
// the defined model is the class itself

module.exports = User