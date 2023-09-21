var express = require('express');
var session = require('express-session');
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
// var  sweetalert = require('sweetalert2');
const { check, body, validationResult } = require('express-validator');
const user_model = require('../Models/user_model');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', function (req, res) {
    res.render('login.ejs');
});


router.post('/login', [
    body('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail(),
    body('password', 'This password must be 6 characters long')
        .exists()
        .custom(async (value, { req }) => {
            let existingUser;
            existingUser = await user_model.findOne({ email: req.body.email });
            if (!existingUser) {
                // Will use the below as the error message
                throw new Error('User will not found! Please Signup');
            }
            const isPasswordCorrect = bcrypt.compareSync(value, existingUser.password)
            if (!isPasswordCorrect) {
                throw new Error('Please enter correct Password');
            }
        })
], async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('login', {
            alert
        })
    }
    else {
        let exitingUser;
        try {
            exitingUser = await user_model.findOne({ email: email })
        } catch (error) {
            return new Error(error)
        }
        // if (!exitingUser) {
        //     return res.status(401).json({ message: 'User will not found! Please Signup' })
        // }
        // const isPasswordCorrect = bcrypt.compareSync(password, exitingUser.password)

        // if (!isPasswordCorrect) {
        //     return res.status(401).json({ message: 'Invalid Email / Password' })
        // }
        const token = jwt.sign({ id: exitingUser._id }, process.env.JWT_SCERET_KEY, {
            expiresIn: "60sec",
        })
        // res.cookie(String(exitingUser._id), token, {
        //     path: '/',
        //     expires: new Date(Date.now() + 1000 * 30),
        //     httpOnly: true,
        //     sameSite: 'lax'
        // })

        return res.status(200).json({ message: 'Successfully Logged In', user: exitingUser, token })
        //   req.flash('success', 'login successful! You can now log in.');
        //     res.redirect('/')
        //  return    res.status(200).json({  user: exitingUser, token })
    }

});


module.exports = router;