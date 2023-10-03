const mongoose = require('mongoose')
const Scheme = mongoose.Schema;
const crypto = require('crypto')
const userScheme = new Scheme({
    password: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },
    email_status: {
        type: String,
        require: true
    },
    token: {
        type: String
    },
    passwordChangeAt: Date,
    passwordResetToken: {
        type: String
    },
    passwordResetTokenExpires: Date
});

userScheme.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    console.log(resetToken, this.passwordResetToken)
    return resetToken
}

module.exports = mongoose.model('user', userScheme)