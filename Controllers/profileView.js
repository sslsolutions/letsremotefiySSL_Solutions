/////////updating user Profile in profile page/////////
 const express=require("express")
 const router=express.Router();

const user_skill_model = require('../Models/user_skill_model'); // Import your Sequelize model


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
