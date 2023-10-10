const express = require("express")
const mongoose = require('mongoose')
const router = express.Router()
const user_profile_seller = require('../Models/user_profile_seller_models')
const bodyParser = require('body-parser')
const { check, body, validator } = require('express-validator')
const dotenv = require('dotenv')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcryptjs')
const user_model = require("../Models/user_model")
const { verifyToken, restricted } = require("./middleware/auth")
const user_skill_model = require("../Models/user_skill_model")
dotenv.config();

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/createProfile', verifyToken, async (req, res, next) => {
  const encodedEmail = req.query.email;
  const isEmailValid = decodeURIComponent(encodedEmail)
  res.render('create_Profile.ejs', { userEmail: isEmailValid });
})

router.get('/details', verifyToken, async (req, res) => {
  res.render('details')
})
// const validatorProfile = [
//     check('Designation ', 'Enter your Designation Please!'),
//     check('firstName', 'Please Enter Your First Name!'),
//     check('lastName', 'Please Enter Your Last Name1'),
//     check('phoneNumber', 'Please Select Country Code or Enter Correct Number1')
// ]
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Specify the destination folder for uploads
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname); // Rename the file with a unique name
//     },
//   });
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/createProfile', upload.single('profileImage'), async (req, res) => {
  const userId = req.session.userId
  console.log(userId);
  const { Designation, country, firstName, lastName, phoneNumber, countryCode } = req.body;
  /////////user Profile Pics///////////
  const profileImage = req.file.buffer.toString('base64')

  const userProfile = new user_profile_seller({
    Designation,
    country,
    firstName,
    lastName,
    phoneNumber,
    countryCode,
    user: userId,
    avatar: profileImage
  })
  try {

    if (!userProfile) {
      console.log('profile is not created');
    }
    await userProfile.save();
  } catch (error) {
    console.log(error);
  }
  res.redirect('details')
})
// Handle profile upload

router.put('/update-talent-profile/:id', async (req, res) => {
  try {
    const userId = req.params.id.split('=')[1];
    console.log(userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const { Designation, country, firstName, lastName, phoneNumber, countryCode } = req.body;

    // Find the user profile by userId
    const userProfile = await user_profile_seller.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    // Update the user profile with the new data
    userProfile.Designation = Designation;
    userProfile.country = country;
    userProfile.firstName = firstName;
    userProfile.lastName = lastName;
    userProfile.countryCode = countryCode
    userProfile.phoneNumber = phoneNumber;
    // Save the updated user profile
    await userProfile.save();
    return res.status(200).json({ message: 'User profile is updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/readytojoin', async (req, res) => {
  const userData = await user_profile_seller.findOne({}).populate('user').exec();
  // Check if userData exists and has a user field with an _id
  if (!userData || !userData.user || !userData.user._id) {
    return res.status(404).json({ message: 'User profile not found' });
  }

  // Get the user_profile_seller ID
  const user_profile_sellerId = userData._id;

  // Assuming you have the skills data in req.body.skills
  const { skills, language, Role, Experiences, Resume, SalaryExpetations } = req.body;
  console.log(SalaryExpetations, Experiences)
  // Create a new user_skill_model document and associate it with the user_profile_seller
  const userProfile = new user_skill_model({
    Profile: user_profile_sellerId, // Associate with the user_profile_seller
    skills,
    language,
    Role,
    Experiences,
    Resume,
    SalaryExpetations,

  });

  try {
    // Save the userProfile document to the database
    await userProfile.save();
    if (userProfile) {
      return  res.redirect('/hire_talents')
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  res.redirect('/dashboard')
})

router.get('/url/api', async (req, res) => {
  const id = "650edffca7270f00088d08cf"
  try {
    const userInfo = await user_model.findOne({ _id: id })
    console.log(userInfo)
    return res.status(200).json(userInfo)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server agi Error' });
  }
})

module.exports = router
