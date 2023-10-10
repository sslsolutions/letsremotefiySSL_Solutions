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
const { verifyToken, restricted } = require('../Controllers/middleware/auth')
router.use(bodyParser.urlencoded({ extended: true }))
const restrictedToSeller = restricted('Buyer');


router.get('/login', async (req, res, next) => {
    res.render('login.ejs')
})

const validator = [
    body('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail(),
    body('password', 'Password must be eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        .exists()
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
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
                const userRoles = existingUser.roles; 
                req.user = {
                    id: existingUser._id,
                    email: existingUser.email,
                    roles: userRoles, // Assign user roles here
                };
                res.cookie('token', token, { httpOnly: true });
                const id = req.session.userId = existingUser._id;
                console.log(id);

                // Attempt to find the user's profile
                const userProfile = await user_profile_seller.findOne({ user: id }).populate('user').exec();
                if (!userProfile && existingUser.roles.includes('Seller')) {
                    // Redirect to the seller page
                    const hashedEmail = encodeURIComponent(existingUser.email);
                    res.redirect(`/createProfile?email=${hashedEmail}`);
                } else if (existingUser.roles.includes('Buyer')) {
                    // Redirect to the buyer page
                    res.redirect('/hire_talents');
                }
                else {
                    // Redirect the user to the hire_talents page
                    res.redirect('/seller/dashboard');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

});


module.exports = router;