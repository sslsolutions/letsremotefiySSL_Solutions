const express = require('express')
const router = express.Router()
const EmploymentHistory = require('../Models/employmentHistory')

router.post('/addEmploymentHistory', async (req, res) => {
    const userId = req.cookies.userId
    const { Position, Company, Location, StartDate, EndDate, Description ,CurrentlyWorking} = req.body

try {
    const empHistory = {
        UserId: userId,
        Position, 
        Company,
        Location, 
        StartDate,
        EndDate: CurrentlyWorking ? null : EndDate,
        Description,
        CurrentlyWorking
    }
    await EmploymentHistory.create(empHistory)
    res.status(200).redirect('/talent/profile')
} catch (error) {
     throw error
}
})

module.exports=router