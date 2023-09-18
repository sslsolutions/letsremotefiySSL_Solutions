const mongoose = require('mongoose')
const Scheme = mongoose.Schema;
const contactScheme = new Scheme({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    inquiry: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    Inquiry: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('contact_us', contactScheme)