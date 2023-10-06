var express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

// var  sweetalert = require('sweetalert2');
const { check, body, validationResult } = require('express-validator');
const user_model = require('../Models/user_model');
const bodyParser = require('body-parser');
const user_profile_seller = require('../Models/user_profile_seller_models')
const verifyToken= require('../Controllers/middleware/auth')
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/login', function (req, res) {
    res.render('login.ejs');
});
router.get('/createProfile', verifyToken
    , function (req, res) {
        res.render('create_profile');
    });

const validator = [
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
]
router.post('/login', validator, async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const alert = errors.array();
        res.render('login', { alert });
    } else {
        try {
            const existingUser = await user_model.findOne({ email: email });

            if (!existingUser) {
                // Handle the case where the user does not exist
                res.status(404).json({ message: 'User not found' });
            } else {
                const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SCERET_KEY, {
                    expiresIn: "1200sec",
                });

                res.cookie('token', token, { httpOnly: true });
                const id = req.session.userId = existingUser._id;
                console.log(id);

                // Attempt to find the user's profile
                const userProfile = await user_profile_seller.findOne({ user: id }).populate('user').exec();

                if (!userProfile) {
                    // Redirect the user to create a profile and pass user data
                    res.render('create_profile', { existingUser: existingUser });

                } else {
                    // Redirect the user to the hire_talents page
                    res.redirect('/details');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

});


module.exports = router;