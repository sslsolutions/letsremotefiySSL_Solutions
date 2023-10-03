const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config();
const sendEmail = async (option) => {
    //Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const emailOptions = {
        from: 'SSL Solutions support<support@sslsolution.com>',
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    await transporter.sendMail(emailOptions)
    console.log(emailOptions);
}


module.exports = sendEmail