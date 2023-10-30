
const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken');
const user_model = require('../Models/User');

const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const { check, validationResult, body } = require('express-validator');
const uuid = require('uuid');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());

router.get('/signup', function (req, res) {
    res.render('signup.ejs')

});

const validation = [
    body('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail().custom(async value => {
            const existingUser = await user_model.findOne({where:{ email: value }});
            if (existingUser) {
                // Will use the below as the error message
                throw new Error('A user already exists with this e-mail address');
            }
        }),
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

router.post('/signup', validation, async (req, res, next) => {
    //destructing 
    const { email, password, roles } = req.body
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
        let existingUser;
        console.log(existingUser);
        try {
            existingUser = await user_model.findOne({
                where: {
                    email: email
                }
            });
        } catch (error) {
            console.log(error);
        }
        // if (exitingUser) {
        //     const message="User Alread Exist with this mail" 
        //     return res.status(400).render('signup', message)
        // }
        const hashPassword = bcrypt.hashSync(password)
        //  const comparepassword = bcrypt.compare(hashPassword, password)
        const user ={
            email,
            password: hashPassword,
            roles

        }
        try {
            await user_model.create(user);
            console.log(user);
        }
        catch (err) {
            console.log(err);
        }
        res.redirect('/login');
    }
})

module.exports = router