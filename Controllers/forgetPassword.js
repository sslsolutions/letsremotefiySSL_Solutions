const User = require('../Models/User')
const express = require('express')
const router = express.Router();
const sendEmail = require('../Utils/email')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
const crypto = require('crypto');
const { Op } = require('sequelize');


router.get('/forgetPassword', async (req, res) => {
    res.render('forgetpassword.ejs')
})

router.get('/resetpassword/:token', async (req, res) => {
    res.render('resetPassword.ejs')
})

router.post('/forgetPassword', async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } })
    console.log(user);
    if (!user) {
        console.log('User will not found');
    }
    const resetToken = user.createResetPasswordToken();
    //await user.save({ validateBeforeSave: false })

    await user.save({ fields: ['passwordResetToken', 'passwordResetTokenExpires'] });
    ////send email to the user tto reset the link

    const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    const message = `We have received a Password Reset request. Please use the below link to rest the password \n\n ${resetUrl}\n This reset Password link will be valid only for ten minutes`
    try {
        await sendEmail({
            email: user.email,
            subject: "Password Change request received ",
            message: message
        })
        res.status(200).json({
            status: 'success',
            message: "password reset link send to the user email",
            redirect: "/login"
        })
    } catch (error) {

        return res.status(500).json({ message: 'Internal Server Error' });
    }


})
router.post('/resetPassword/:token', async (req, res) => {

    const token = crypto.createHash('sha256').update(req.params.token).digest('hex')

    try {
        const user = await User.findOne({
            where: {
                passwordResetToken: token,
                passwordResetTokenExpires: { [Op.gt]: new Date() }
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found or token has expired' });
        }

        const newPassword = req.body.password;
        const hashedPassword = bcrypt.hashSync(newPassword, 12);

        user.password = hashedPassword;
        user.passwordResetToken = null; // Clear the password reset token
        user.passwordResetTokenExpires = null; // Clear the token expiration
        user.passwordChangeAt = new Date();
        await user.save({ validateBeforeSave: false });

        const loginToken = jwt.sign({ id: user.id }, process.env.JWT_SCERET_KEY, {
            expiresIn: '1200s',
        });

        res.cookie('token', loginToken, { httpOnly: true });
        req.session.userId = user.id;
        return res.status(200).render('resetPassword.ejs', { token: token })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    // const user = await User.findOne({
    //     where: {
    //         passwordResetToken: token,
    //         passwordResetTokenExpires: { [Op.gt]: new Date() }
    //     }
    // });
    // if (!user) {
    //     res.send({ message: 'user not found' }).status(400)
    // }
    // const password = req.body.password

    // const hashPassword = bcrypt.hashSync(password)
    // console.log(hashPassword);
    // user.password = hashPassword
    // //user.confirmPassword = req.body.confirmPassword
    // console.log(req.body.confirmPassword)
    // user.passwordResetToken = undefined
    // user.passwordResetTokenExpires = undefined
    // user.passwordChangeAt = Date.now()

    // await user.save();
    // const loginToken = jwt.sign({ id: user._id }, process.env.JWT_SCERET_KEY, {
    //     expiresIn: "1200sec",
    // });

    // res.cookie('token', loginToken, { httpOnly: true });
    // const id = req.session.userId = user._id;
    // console.log(id);
    // res.status(200).send({
    //     message: "success",
    //     token: loginToken,
    //     id: id
    // })

})
module.exports = router