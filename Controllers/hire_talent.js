const express=require('express')
const { verifyToken } = require('./middleware/auth')
const Buyer_Demanded_Skill = require('../Models/buyer_demanded_skill')
const router=express.Router()

router.get('/hire_talent', verifyToken, async(req,res)=>{
res.render('hire_talents.ejs')
})

router.post('/client/hire_talent', async (req,res)=>{
    const userId=req.cookies.userId
    try {
      const {desiredSkill, desiredRole, fullName, companyName} =req.body
      const buyerdemand={
        UserId:userId,
        desiredRole,
        desiredSkill,
        fullName,
        companyName
      }
      await Buyer_Demanded_Skill.create(buyerdemand)

    } catch (error) {
        return res.status(500).render('505pg')
    }
})
module.exports=router