var express = require ('express');
var session = require ('express-session');
const router=express.Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config();
// var  sweetalert = require('sweetalert2');
const { check, validationResult } = require('express-validator');
const user_model = require('../Models/user_model');


router.get('/', function(req ,res){
    res.render('login.ejs');
});


router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    let exitingUser;
    try {
        exitingUser = await user_model.findOne({ email: email })
    } catch (error) {
        return new Error(error)
    }
    if (!exitingUser) {
        return res.status(401).json({ message: 'User will not found! Please Signup' })
    }
    const isPasswordCorrect = bcrypt.compareSync(password, exitingUser.password)

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid Email / Password' })
    }
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
});


module.exports = router;