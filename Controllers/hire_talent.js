const express = require('express')
const { verifyToken } = require('./middleware/auth')
const Buyer_Demanded_Skill = require('../Models/buyer_demanded_skill')
const router = express.Router()

const multer = require('multer');
const { route } = require('./signup_controller');
const User = require('../Models/User');
const Buyer_Step_One = require('../Models/buyer_step_one');

const storage = multer.memoryStorage(); // This stores the file as a buffer
const upload = multer({ storage: storage });

router.get('/hire_talent', verifyToken, async (req, res) => {
  res.render('hire_talents.ejs')
})

router.get('/step_one', verifyToken, (req, res) => {
  res.render('step_one.ejs')
})
router.get('/step_two', verifyToken, (req, res) => {
  res.render('step_two.ejs')
})
router.post('/hire_talent', async (req, res) => {
  const userId = req.cookies.userId;

  try {
    const { desiredSkill, desiredRole, fullName, companyName } = req.body;


    const buyerdemand = {
      UserId: userId,
      desiredSkill,
      desiredRole,
      fullName,
      companyName,
    };
    console.log(buyerdemand);
    await Buyer_Demanded_Skill.create(buyerdemand);

    // Redirect or respond as needed
    res.status(200).redirect('/client/step_one');
  } catch (error) {
    console.error(error);
    return res.status(500).render('505pg');
  }
});

router.post('/experiencelevel', async (req, res) => {

  try {
    await User.findByPk(req.cookies.userId, {
      include: [{
        model: Buyer_Demanded_Skill,
      }]
    }).then((data) => {
      if (!data) {
        req.flash('error', 'User Not found')
        return res.redirect('/client/step_one')
      }
      console.log(data.id)
      const { timeLevel, startTime, talentExperience, numberOfEmployee, workEmail, phoneNumber } = req.body
      Buyer_Step_One.create({
        buyerdemandedskillId: data.id,
        timeLevel,
        startTime,
        talentExperience,
        numberOfEmployee,
        workEmail,
        phoneNumber
      })
      req.flash('success', 'Data retrieved successfully');
      return res.status(200).render('step_two.ejs')
    }).catch((error) => {
      req.flash('error', error)
      return res.redirect('/client/step_one')
    })

  } catch (error) {
    console.error(error);
    return res.status(500).render('505pg');
  }
})
module.exports = router