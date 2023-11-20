/////////updating user Profile in profile page/////////
const express = require("express")
const router = express.Router();
const fs = require('fs')
const user_skill_model = require('../Models/user_skill_model'); // Import your Sequelize model
const User = require("../Models/User");
const user_profile_seller = require("../Models/user_profile_seller_models");
const { verifyToken } = require("./middleware/auth");
const EmploymentHistory = require("../Models/employmentHistory");
const moment = require('moment');
const UserEducationHistory = require("../Models/userEducationHistory");
const Certification = require("../Models/Certification");
const { validationResult, body } = require('express-validator')


const checkArrayLength =[
  // Use the 'custom' validator to check the number of selected checkboxes
  body('interestedSkills').custom(value => {
    if (Array.isArray(value) && value.length <= 6) {
      return true; // The validation passed
    }
    throw new Error('You can select a maximum of 6 checkboxes.'); // Validation failed
  }),
]
router.get('/talent/profile', async (req, res) => {
  const userId = req.cookies.userId

  /////////////getting the useremloyement history ////////////
  const userEmplyHistory = await EmploymentHistory.findAll({
    where: {
      UserId: userId,
    },
    order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']],
  })// Format the dates in each employment history record
  const formattedEmploymentHistory = userEmplyHistory.map((employment) => {
    const startdate = new Date(employment.StartDate);
    const endDate = new Date(employment.EndDate)
    const options = { year: 'numeric', month: 'long' };
    employment.formattedStartDate = startdate.toLocaleDateString(undefined, options);
    employment.formattedEndDate = endDate.toLocaleDateString(undefined, options);
    return employment
  });
  /////////////////////end///////////////////////
  ////////////////////getCertificatin/////////////

  const getuserCertification = await Certification.findAll({
    where: {
      UserId: userId
    }
    , order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']]

  })

  const userCertificationData = getuserCertification.map((certifications) => {
    const startYear = new Date(certifications.StartYear);
    const endYear = new Date(certifications.EndYear)
    const options = { year: 'numeric', month: 'long' };
    certifications.formattedStartYear = startYear.toLocaleDateString(undefined, options);
    certifications.formattedEndYear = endYear.toLocaleDateString(undefined, options);
    return certifications
  });
  ///////get user education history//////////////
  const userEducationHistory = await UserEducationHistory.findAll({
    where: {
      userId: userId,
    },
    order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']],
  })
  const getUserEducationHistroy = userEducationHistory.map((education) => {
    const startYear = new Date(education.StartYear);
    const endYear = new Date(education.EndYear)
    const options = { year: 'numeric', month: 'long' };
    education.formattedStartYear = startYear.toLocaleDateString(undefined, options);
    education.formattedEndYear = endYear.toLocaleDateString(undefined, options);
    return education
  })

  /////////////getting the complete user info//////////////////////
  User.findByPk(userId, {
    include: [
      {
        model: user_profile_seller,
        include: user_skill_model,
      },
    ],
  })
    .then((user) => {
      if (user) {
        const user_image = user.user_profile_seller.avatar;
        const userSkillsJSON = user.user_profile_seller.user_skill_model.skills;
        const userSkillsArray = JSON.parse(userSkillsJSON);
        const userInterstedSkills = JSON.parse(user.user_profile_seller.user_skill_model.interestedSkills)
        return res.render('networkprofile.ejs', {
          userDetails: user,
          user_image,
          userSkillsJSON: userSkillsArray,
          userInterstedSkills: userInterstedSkills,
          employmentHistory: formattedEmploymentHistory,
          userEducationHistory: getUserEducationHistroy,
          getuserCertification: userCertificationData
        })
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
})
//////////////////////////end//////////////////////
router.post('/update/info', async (req, res) => {

  try {
    const userId = req.cookies.userId
    console.log(userId);
    const { descriptions, country, firstName, lastName } = req.body;
    console.log(descriptions, country, firstName);
    User.findByPk(userId, {
      include: [
        {
          model: user_profile_seller,
          include: user_skill_model,
        },
      ],
    })
      .then((user) => {
        if (!user) {
          // User found with the specified conditions
          return res.status(404).json({ message: 'User not found' });
        }
        user.user_profile_seller.firstName = firstName
        user.user_profile_seller.lastName = lastName
        user.user_profile_seller.country = country
        user.user_profile_seller.descriptions = descriptions
        user.user_profile_seller.save();
        return res.redirect('/talent/profile')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})

router.post('/update/info/seller', checkArrayLength, async (req, res) => {

    try {
      const userId = req.cookies.userId
      console.log(userId);
      const { Experiences, language, skills, interestedSkills } = req.body;
      console.log(Experiences, language, skills);
      User.findByPk(userId, {
        include: [
          {
            model: user_profile_seller,
            include: user_skill_model,
          },
        ],
      })
        .then((user) => {
          if (!user) {
            // User found with the specified conditions
            return res.status(404).json({ message: 'User not found' });
          }
          user.user_profile_seller.user_skill_model.Experiences = Experiences
          user.user_profile_seller.user_skill_model.language = language
          user.user_profile_seller.user_skill_model.skills = skills
          user.user_profile_seller.user_skill_model.interestedSkills = interestedSkills
          user.user_profile_seller.user_skill_model.save();
          return res.redirect('/talent/profile')
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error(error);
      return res.status(500).render('505pg.ejs')
    }
})

router.post('/talent/3350', async (req, res) => {
  const workingStatus = req.body.method;
  const userId = req.cookies.userId;

  try {
    // Find the user by their ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update the user's working status
    user.workingStatus = workingStatus;

    // Save the changes to the database
    await user.save();

    return res.status(200).redirect('/talent/profile');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router