// domain.com/verifytoken/ascvxxbgvhbueuhh
// domain.com/verifytoken?token=hhjjj
import nodemailer from 'nodemailer'
import User from '@/models/usermodel'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export const sendEmail=async ({email,emailType,userId}:any)=>{
    try {
        // create a hashed 
      const hashedtoken= await bcrypt.hash(userId.toString(),10)
       if(emailType==="VERIFY") {
            await User.findByIdAndUpdate(userId,{verifyToken:hashedtoken ,verifyTokenExpiry:Date.now() +3600000})}
       else if(emailType==="RESET") {
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedtoken ,forgotPasswordTokenExpiry:Date.now() +3600000})}
var transport=nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "181ab70942a18e",
    pass: "425849bf65e278"
    }
    })
const mailOptions={
    from :'Mahesh@gmail.com',
    to :email,
    subject:emailType=="VERIFY"?"verify your email" :"Reset your email",

    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here</a> to ${
        emailType === "VERIFY"
            ? "verify your email"
            : "reset your password"
    }
    or copy paste the link in your browser .<br>${process.env.DOMAIN}/verifyemail?token=${hashedtoken}</p>`
}
const mailresponse=await transport.sendMail(mailOptions)
    }
    catch (error :any){
        throw new Error(error.message)
    }
}