const bodyParser = require('body-parser');
const express = require('express')
const router = express.Router();
const contact_model = require('../Models/contact_model');

router.get('/contact-us', function (req, res) {
    res.render('Contact-Us.ejs');
});


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

    router.post('/auth' , async (req, res, next) => {
        //destructing 
        const { name, email, message, Inquiry } = req.body
        //validation for exiting user  
        const user = new contact_model({
            name,
            email,
            message,
            Inquiry
        })
        try {
            await user.save();
        }
        catch (err) {
            console.log(err);
        }
        return  res.redirect('/contact-us')
    })

    
    

module.exports = router