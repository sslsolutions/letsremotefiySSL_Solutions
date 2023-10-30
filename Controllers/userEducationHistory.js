const express = require('express')
const router = express.Router()
const userEducation = require('../Models/userEducationHistory')

<<<<<<< HEAD
router.post('/addEducation', async (req, res) => {
=======
router.post('/', async (req, res) => {
>>>>>>> 3b1fe814d2ede77af73168688b71ddf62ebecf15
    const userId = req.cookies.userId
    try {
        const { Degree, Field, Institute, StartYear, EndYear } = req.body
        const empEducationHistory = {
            UserId: userId,
            Degree,
            Field,
            Institute,
            StartYear,
            EndYear
        }
        await userEducation.create(empEducationHistory)
        res.status(200).redirect('/talent/profile')
    } catch (error) {
        throw error
    }

})

<<<<<<< HEAD
module.exports = router
=======
module.exports = router
>>>>>>> 3b1fe814d2ede77af73168688b71ddf62ebecf15
