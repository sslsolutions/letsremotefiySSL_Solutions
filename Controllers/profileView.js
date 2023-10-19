/////////updating user Profile in profile page/////////
const express = require("express")
const router = express.Router();
const fs=require('fs')
const user_skill_model = require('../Models/user_skill_model'); // Import your Sequelize model
const User = require("../Models/User");
const user_profile_seller = require("../Models/user_profile_seller_models");
const { verifyToken } = require("./middleware/auth");
const { encodeBase64 } = require("bcryptjs");






router.get('/', verifyToken, (req, res) => {
  const userId = req.cookies.userId
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
        const binaryImageData =Buffer.from(user_image).toString('base64');
        const dataUri = `data:image/png;base64,${binaryImageData}`;
        fs.writeFileSync('avatar.jpge', dataUri)
        console.log(binaryImageData);
        return res.render('network-profile.ejs', { userDetails: user, image: dataUri })
      }
    }).catch((error) => {
      console.error('Error:', error);
    });

})

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

module.exports = router