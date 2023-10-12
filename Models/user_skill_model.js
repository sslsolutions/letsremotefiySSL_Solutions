const mongoose=require('mongoose')
const Schema =mongoose.Schema;

const ReadytoJoin= new Schema({
    
    Role:{
        type:String,
        require: true
    },
    Resume:{
        type:String,
        require:true
    },
    Experiences:{
        type:String,
        require:true
    },
    platform:{
        type:String,
        require:true
    },
    language:{
        type:String,
        require:true
    },
    skills:{
        type:[String],
        require:true
    },
    SalaryExpetations:{
        type:String,
        require
    },
    Profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_profile_seller', // This creates a reference to the User model
      },
})

module.exports= mongoose.model('skills_sections', ReadytoJoin)