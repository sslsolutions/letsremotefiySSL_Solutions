/////////updating user Profile in profile page/////////
const express = require("express")
const router = express.Router();

const user_skill_model = require('../Models/user_skill_model'); // Import your Sequelize model
const User = require("../Models/User");
const user_profile_seller = require("../Models/user_profile_seller_models");


router.put('/update-talent-profile/', async (req, res) => {
  try {
    const userId = req.cookies.id.split('=')[1];

    if (!userId) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Destructure the request body to get the attributes you want to update
    const { Designation, country, firstName, lastName } = req.body;

    // Update the specific attributes of the user profile using the update method
    await user_skill_model.update(
      { Designation, country, firstName, lastName },
      { where: { userId } }
    );

    return res.status(200).json({ message: 'User profile is updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

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
          return res.redirect('/talent/profile-view')
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