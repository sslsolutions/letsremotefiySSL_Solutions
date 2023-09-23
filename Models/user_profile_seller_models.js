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
    phone:{
        type:Number,
        require:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // This creates a reference to the User model
      },

})
module.exports= mongoose.model('user_profile_seller', user_profile_seller)
