const user_model = require("../Models/user_model")
const express = require('express')
const router = express.Router();
const sendEmail = require('../Utils/email')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
const crypto = require('crypto')
router.post('/forgetPassword', async (req, res, next) => {
    const user = await user_model.findOne({ email: req.body.email })
    if (!user) {
        console.log('User will not found');

    }
    const resetToken = user.createResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    ////send email to the user tto reset the link

    const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    console.log(resetUrl);
    const message = `We have received a Password Reset request. Please use the below link to rest the password \n\n ${resetUrl}\n\n This reset Password link will be valid only for ten minutes`
    try {
        await sendEmail({
            email: user.email,
            subject: "Password Change request received ",
            message: message
        })
        res.status(200).json({
            status: 'success',
            message: "password reset link send to the user email"
        })
    } catch (error) {
        user.passwordResetToken = undefined,
            user.passwordResetTokenExpires = undefined,
            user.save({ validateBeforeSave: false })
        return res.status(500).json({ message: 'Internal Server Error' });
    }


})
router.patch('/resetPassword/:token', async (req, res) => {

    const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await user_model.findOne({ passwordResetToken: token, passwordResetTokenExpires: { $gt: Date.now() } })

    if (!user) {
        res.send({ message: 'user not found' }).status(400)
    }
    const password = req.body.password
    const hashPassword = bcrypt.hashSync(password)
    user.password = hashPassword
    user.confirmPassword = req.body.confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined
    user.passwordChangeAt = Date.now()

    await user.save();
    const loginToken = jwt.sign({ id: user._id }, process.env.JWT_SCERET_KEY, {
        expiresIn: "1200sec",
    });
    
    res.cookie('token', loginToken, { httpOnly: true });
    const id = req.session.userId = user._id;
    console.log(id);
    res.status(200).send({
        message: "success",
        token: loginToken,
        id: id
    })

})
module.exports = router