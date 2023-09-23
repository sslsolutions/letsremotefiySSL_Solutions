const express = require("express")
const router = express.Router()
const user_profile_seller = require('../Models/user_profile_seller_models')
const bodyParser = require('body-parser')
const { check, body, validator } = require('express-validator')
const dotenv = require('dotenv')
const user_model = require("../Models/user_model")

dotenv.config();


router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

// const validator = [
//     body('designation ', 'Enter your Designation Please!'),
//     body('firstName', 'Please Enter Your First Name!') ,  
//     body('lastName', 'Please Enter Your Last Name1')   ,
//     body('phoneNumber', 'Please Select Country Code or Enter Correct Number1')   

// ]
router.post('/hire-talent-profile', async (req, res) => {

    const userId = req.cookies.userId
    //console.log(id ,"cookies id");

    const { Designation, country, firstName, lastName, phoneNumber } = req.body;
    const userProfile = new user_profile_seller({
        Designation,
        country,
        firstName,
        lastName,
        phoneNumber,
        user: userId
    })
    try {
        await userProfile.save()
    } catch (error) {
        console.log(error)
    }
    return res.status(200).send({ message: "user Profile is created" })
})



router.get('/details', async(req, res)=>{
    const userId=req.cookies.userId
    try {
const userProfile= await user_profile_seller.findOne({user:userId}).populate('user').exec()
if (!userProfile) {
    return res.status(402).send({message:"userProfile not found"})
    
}
console.log(userProfile.user.email);
res.status(200).json({ userProfile});
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ message: 'Internal server error' });
    }
  
   
})
router.put('/update-talent-profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { Designation, country, firstName, lastName, phoneNumber } = req.body;

        // Find the user profile by userId
        const userProfile = await user_profile_seller.findOne({ userId: userId });

        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        // Update the user profile with the new data
        userProfile.Designation = Designation;
        userProfile.country = country;
        userProfile.firstName = firstName;
        userProfile.lastName = lastName;
        userProfile.phoneNumber = phoneNumber;

        // Save the updated user profile
        await userProfile.save();

        return res.status(200).json({ message: 'User profile is updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router
