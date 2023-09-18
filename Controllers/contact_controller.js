const bodyParser = require('body-parser');
const express = require('express')
const session = require('express-session')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const contact_model = require('../Models/contact_model');

router.get('/contact-us', function (req, res) {
    res.render('contact-us.ejs');
});


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// router.post('/contact', [
//     check('name').notEmpty().withMessage('Must enter the name'),
//     check('email').notEmpty().withMessage('Please enter the mail.')
// ],
//     (req, res) => {
//         const { name, email, message } = req.body
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() })
//         }
//         const addcontactresponse = new contact_model({
//             name,
//             email,
//             message
//         })
//         try {
//             addcontactresponse.save()
//         } catch (error) {
//             console.log(error);
//         }
//         res.send('please enter your name or email')
//         res.end();
//     })

    router.post('/' , async (req, res, next) => {
        //destructing 
        const { name, email, message } = req.body
        //validation for exiting user  
        const user = new contact_model({
            name,
            email,
            message
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