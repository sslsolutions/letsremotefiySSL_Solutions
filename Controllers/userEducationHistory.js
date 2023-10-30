const express = require('express')
const router = express.Router()
const userEducation = require('../Models/userEducationHistory')

router.post('/addEducation', async (req, res) => {
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

module.exports = router
