import nodemailer from "nodemailer";
import transporter_config from "../config/nodemailer";

async function sendEmailVerificationCode(email : string, otp : string) {

    const transport = nodemailer.createTransport(transporter_config);

    const mailOption = {
      from: process.env.GOOGLE_ACCOUNT_NODEMAILER,
      to: email,
      subject: "Email Verification Code for Bhromon Bilash",
      text: `Your code for email verification is ${otp}`,
      html: `<p> Your code for email verification is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    };

    const result = await transport.sendMail(mailOption);

    return result;
}

export const sendForgetPasswordverificationCode = async(email:string,otp:string) =>{
  const transport = nodemailer.createTransport(transporter_config);

    const mailOption = {
      from: process.env.GOOGLE_ACCOUNT_NODEMAILER,
      to: email,
      subject: "Forget Password Code for Syntellix",
      text: `Your code for forget password is ${otp}`,
      html: `<p> Your code for forget password is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    };

    const result = await transport.sendMail(mailOption);

    return result;
}


export default sendEmailVerificationCode