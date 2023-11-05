const transporter_config = {
    service: "gmail",
    auth: {
      user : process.env.GOOGLE_ACCOUNT_NODEMAILER,
      pass : process.env.GOOGLE_ACCOUNT_NODEMAILER_PASSWORD
    },
}



export default transporter_config