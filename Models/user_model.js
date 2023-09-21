const mongoose=require('mongoose')
const Scheme=mongoose.Schema;

const userScheme = new Scheme({
    password: {
        type: String,
        require: true
    },
    
    email: {
        type: String,
        require: true
    },
    email_status: {
        type: String,
        require: true
    },
    token:{
        type:String
    }
   
});

module.exports= mongoose.model('user', userScheme)