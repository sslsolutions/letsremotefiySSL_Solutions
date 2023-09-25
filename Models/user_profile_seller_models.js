const mongoose =require('mongoose')
const Schema=mongoose.Schema;

const user_profile_seller= new Schema({
    Designation:{
        type:String,
        require:true
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    phoneNumber: {
        type: String, // Change the data type to String
        required: true,
    },
    country:{
        type:String,
        require:true
    },
    countryCode:{
        type:String,
        require:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // This creates a reference to the User model
      },
    avatar:{
        type:String
    }
    
})
module.exports= mongoose.model('user_profile_seller', user_profile_seller)
