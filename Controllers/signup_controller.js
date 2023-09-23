
const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken');
const user_model = require('../Models/user_model');

const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const { check, validationResult, body } = require('express-validator')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());

router.get('/signup', function (req, res) {
    res.render('signup.ejs')

});
const validation = [
    body('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail().custom(async value => {
            const existingUser = await user_model.findOne({ email: value });
            if (existingUser) {
                // Will use the below as the error message
                throw new Error('A user already exists with this e-mail address');
            }
        }),
    check('password', 'This password must be 6 characters long')
        .exists()
        .isLength({ min: 6 }),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            console.log('Passwords do not match');
            throw new Error('Passwords do not match');
        }
        return true;
    }),
]

router.post('/signup',validation, async (req, res, next) => {
    //destructing 
    const { email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('signup', {
            alert
        })
    }

    else {
        //validation for exiting user  
        let exitingUser;
        try {
            exitingUser = await user_model.findOne({ email: email })
        } catch (error) {
            console.log(error);
        }
        // if (exitingUser) {
        //     const message="User Alread Exist with this mail" 
        //     return res.status(400).render('signup', message)
        // }
        const hashPassword = bcrypt.hashSync(password)
        //  const comparepassword = bcrypt.compare(hashPassword, password)
        const user = new user_model({
            email,
            password: hashPassword

        })
        try {
            await user.save();
            console.log(user);
        }
        catch (err) {
            console.log(err);
        }
        res.redirect('/login');
    }

   

})

module.exports = router