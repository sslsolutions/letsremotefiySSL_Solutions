const express= require('express')
const router=express.Router();

// router.get("*", async (req, res)=>{
//     if(!req.cookies.userId){
//  res.status(402).redirect('/')
//     }
// })
router.get('/logout',async (req, res)=>{
        // If the user is loggedin
        res.clearCookie('token')
        res.redirect('/login')
        res.end()
})


module.exports = router