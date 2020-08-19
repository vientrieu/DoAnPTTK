const nodemailer = require("nodemailer");
const log = console.log;
module.exports = {
    EmailVerification: async(EmailUser, OTP) => {
        // Step 1
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "yeuarmylatao@gmail.com", // TODO: your gmail account
                pass: "Haogoogle5551" // TODO: your gmail password
            }
        });
        // Step 2
        let mailOptions = {
            from: "yeuarmylatao@gmail.com", // TODO: email sender
            to: EmailUser, // TODO: email receiver
            subject: "Email verification!!!!!!",
            text: "Your email verification code is:" + OTP
        };
        // Step 3
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return 0;
            }
            return 1;
        });
    },
    sendEmailwithContent: async(EmailUser, content) => {
        // Step 1
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "yeuarmylatao@gmail.com", // TODO: your gmail account
                pass: "Hao285695551" // TODO: your gmail password
            }
        });
        // Step 2
        let mailOptions = {
            from: "yeuarmylatao@gmail.com", // TODO: email sender
            to: EmailUser, // TODO: email receiver
            subject: "Thông báo đấu giá!!!!!!",
            text: content
        };
        // Step 3
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return 0;
            }
            return 1;
        });
    }
};