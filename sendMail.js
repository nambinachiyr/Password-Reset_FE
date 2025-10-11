const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmail = async(to, subject, htmlContent)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
           user:process.env.GOOGLE_EM,
           pass:process.env.GOOGLE_PW
        }
    })

    const mailOption = {
        from:process.env.GOOGLE_EM,
        to,
        subject,
        html:htmlContent
    }

    await transporter.sendMail(mailOption)
    console.log("Sent Mail to - ",to)
}
module.exports = sendEmail