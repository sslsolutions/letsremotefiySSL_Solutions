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
const { check, validationResult, body } = require('express-validator');


router.get('/forgetPassword', async (req, res) => {
    res.render('forgetpassword.ejs')
})

router.get('/resetpassword/:token', async (req, res) => {
    const token = req.params.token
    res.render('changepasswor.ejs', { token })
})

const validation = [
    check('password', 'Password must be eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        .exists()
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
]
router.post('/forgetPassword', async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
        console.log('User will not found');
    }
    const resetToken = user.createResetPasswordToken();
    //await user.save({ validateBeforeSave: false })

    await user.save({ fields: ['passwordResetToken', 'passwordResetTokenExpires'] });
    ////send email to the user tto reset the link

    const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    const message = `We have received a Password Reset request. Please use the below link to rest the password \n\n ${resetUrl} This reset Password link will be valid only for ten minutes`
    try {
        await sendEmail({
            email: user.email,
            subject: "Password Change request received ",
            message: message
        })
        res.status(200).redirect('/login')
    } catch (error) {

        return res.status(500).json({ message: 'Internal Server Error' });
    }


})
router.post('/resetpassword/:token', validation, async (req, res) => {
    const errors = validationResult(req)
    const token = req.params.token
    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('changepasswor.ejs', {
            alert,
            token
        })
    }
    else {
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
            console.log(newPassword);
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
            return res.status(200).redirect('/login')
        } catch (error) {
            console.error(error);
            return res.status(500).render('505pg.ejs')
        }

    }
})
module.exports = router