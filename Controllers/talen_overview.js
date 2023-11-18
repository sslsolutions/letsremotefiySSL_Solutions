const express = require('express')
// const { verifyToken } = require('./middleware/auth')
const User = require('../Models/User')
const user_profile_seller = require('../Models/user_profile_seller_models')
const user_skill_model = require('../Models/user_skill_model')
const router = express.Router()


router.get('/talent/overview', async (req, res) => {

    try {
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
                if (!user) {
                    // User found with the specified conditions
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.render('talent-overview.ejs',{
                    userData:user
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } catch (error) {
        console.error(error);
        return res.status(500).render('505pg.ejs')
    }
})


module.exports = router