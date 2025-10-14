// const nodemailer = require('nodemailer')
require('dotenv').config()

// const sendEmail = async(to, subject, htmlContent)=>{
//     const transporter = nodemailer.createTransport({
//         service:"gmail",
//         auth:{
//            user:process.env.GOOGLE_EM,
//            pass:process.env.GOOGLE_PW
//         }
//     })

//     const mailOption = {
//         from:process.env.GOOGLE_EM,
//         to,
//         subject,
//         html:htmlContent
//     }

//     await transporter.sendMail(mailOption)
//     console.log("Sent Mail to - ",to)
// }

const sgMail = require('@sendgrid/mail');

const sendEmail = async(to,subject,htmlContent)=>{

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to,
      from:process.env.GOOGLE_EM, // Use the email address or domain you verified above
      subject,
      htmlContent
      
    };
    
    (async () => {
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);
    
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })
}
module.exports = sendEmail