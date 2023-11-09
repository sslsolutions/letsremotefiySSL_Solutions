const express=require('express')
const { verifyToken } = require('./middleware/auth')
const Buyer_Demanded_Skill = require('../Models/buyer_demanded_skill')
const router=express.Router()

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get('/hire_talent', verifyToken, async(req,res)=>{
res.render('hire_talents.ejs')
})

router.post('/client/hire_talent', upload.array('image', 10),async (req,res)=>{
  
    const userId=req.cookies.userId
  
    try {
      
      const {desiredSkill, desiredRole, fullName, companyName} =req.body
      const images=req.file
      const skillData = desiredSkill.map((skill, index) => ({
        btnname: skill,
        img: `data:${images[index].mimetype};base64,${images[index].buffer.toString('base64')}`,
      }));
      const buyerdemand={
        UserId:userId,
        desiredRole,
        desiredSkill:skillData,
        fullName,
        companyName
      }
      await Buyer_Demanded_Skill.create(buyerdemand)

    } catch (error) {
        return res.status(500).render('505pg')
    }
})
module.exports=router