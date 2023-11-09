const express=require('express');
const Certification = require('../Models/Certification');
const router=express.Router();




router.post('/addCertification', async(req, res)=>{
    const userId=req.cookies.userId
    try {
        const { Certificate, Organization ,Institute, StartYear, EndYear ,Description}=req.body

        const addCertification={
            UserId:userId,
            Certificate,
            Organization,
            Institute,
            StartYear,
            EndYear,
            Description
        }
    
     await Certification.create(addCertification)
     req.flash('success', 'Buyer\'s demanded skill created successfully');
    res.status(200).redirect('/talent/profile')
      

    } catch (error) {
        throw error
    }
})


module.exports= router