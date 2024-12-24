import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import User from '@/models/user.model.js'

export const sendEmail = async({email,emailType,userId}:any) => {
    try {
        const hashToken = await bcryptjs.hash(userId.toString,10)
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashToken,
                verifyTokenExpiry: Date.now()+3600000,  
            })
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashToken,
                forgotPAsswordExpiry: Date.now()+3600000,  
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOption = {
            from : 'yadneshranshevare@gmail.com',
            to: email,
            subject : emailType ==="VERIFY" ? "verify your email " : "reset your password",
            html:`<p>click<a href="${process.env.DOMAIN}/verifyMail?token=${hashToken}">here</a>to ${emailType === "VERIFY"? "verify your email":"reset your password" }`
        }
        
        const mailResponse =  await transport.sendMail(mailOption)
        return mailResponse
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}
