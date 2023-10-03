const user_model = require("../Models/user_model")
const express = require('express')
const router = express.Router();
const sendEmail = require('../Utils/email')

router.post('/forgetPassword', async (req, res, next) => {
    const user = await user_model.findOne({ email: req.body.email })
    if (!user) {
        console.log('User will not found');

    }
    const resetToken = user.createResetPasswordToken();
    
    await user.save({validateBeforeSave:false})

    ////send email to the user tto reset the link

    const resetUrl= `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    console.log(resetUrl);
    const message= `We have received a Password Reset request. Please use the below link to rest the password \n\n ${resetUrl}\n\n This reset Password link will be valid only for ten minutes`
    try {
        await sendEmail({
            email:user.email,
            subject:"Password Change request received ",
            message:message
        }) 
        res.status(200).json({
            status:'success',
            message:"password reset link send to the user email"
        })
    } catch (error) {
        user.passwordResetToken=undefined,
        user.passwordResetTokenExpires=undefined,
        user.save({validateBeforeSave:false})
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    

})
router.patch('/resetPassword/:token', async (req,res)=>{

})





module.exports = router