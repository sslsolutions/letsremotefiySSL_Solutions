const express = require('express')
const { verifyToken } = require('./middleware/auth')
const Buyer_Demanded_Skill = require('../Models/buyer_demanded_skill')
const router = express.Router()

const multer = require('multer');
const { route } = require('./signup_controller');
const User = require('../Models/User');

const storage = multer.memoryStorage(); // This stores the file as a buffer
const upload = multer({ storage: storage });

router.get('/hire_talent', verifyToken, async (req, res) => {
  res.render('hire_talents.ejs')
})

router.get('/step_one', (req, res) => {
  res.render('step_one.ejs')
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
    User.findByPk(req.cookies.userId, {
      include: [{
        model: Buyer_Demanded_Skill,
      }]
    }).then((data) => {
      if (!data) {
        req.flash('error', 'User Not found')
        
        return res.redirect('/client/step_one')
      }
      req.flash('success', 'Data retrieved successfully');
      return res.redirect('/client/step_one')
    }).catch((error) => {
      console.log(error);
    })

  } catch (error) {
    console.error(error);
    return res.status(500).render('505pg');
  }
})
module.exports = router