
const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken');
const user_model = require('../Models/user_model');
const bodyParser = require('body-parser');
const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/signup', function (req, res) {
    res.render('signup.ejs', { errors: [] })

});
router.post('/signup', [
    [
        check("password").notEmpty().withMessage("Password is required"),
        check("email").notEmpty().isEmail().withMessage("Valid Email required"),
    ],
], async (req, res, next) => {
    //destructing 
    const { email, password, comparepass } = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('signup', { errors: errors.array() });
    }
    // if (!errors.isEmpty()) {
    //     errors.array().forEach(error => {
    //         req.flash('error', error.msg);
    //     });
    // }
    else {
        //validation for exiting user  
        let exitingUser;
        try {
            exitingUser = await user_model.findOne({ email: email })
        } catch (error) {
            console.log(error);
        }
        if (exitingUser) {
            return res.status(400).json({ message: "User Alread Exist with this mail" })
        }
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
    }
    return res.status(200).json({ message: 'Successfully Logged In' })

})

module.exports = router