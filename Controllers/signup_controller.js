
const bcrypt=require('bcryptjs')
//const jwt = require('jsonwebtoken');
const user_model = require('../Models/user_model');
const bodyParser = require('body-parser');
const express = require('express')
const router = express.Router();


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/signup', function (req, res) {
    res.render('signup.ejs');
});
router.post('/auth/signup', async (req, res, next) => {
    //destructing 
    const {  email, password,comparepass } = req.body
       let errors = [];
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
    if ( !email || !password || !comparepass) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (password !== comparepass) {
        errors.push({ msg: 'Passwords do not match' });
    }
 const hashPassword= bcrypt.hashSync(password)
  //  const comparepassword = bcrypt.compare(hashPassword, password)
    const user = new user_model({
        email,
        password:hashPassword,
    })
    try {
        await user.save();
    }
    catch (err) {
        console.log(err);
    }
    return res.redirect('/signup')
})

module.exports = router