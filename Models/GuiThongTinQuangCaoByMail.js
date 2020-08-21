const nodemailer = require("nodemailer");
const log = console.log;
module.exports = {
    sendEmailwithContent: async(EmailUser,titlemail, content) => {
        // Step 1
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "huuhao1999testpttkhttt@gmail.com", // TODO: your gmail account
                pass: "123456789Oo" // TODO: your gmail password
            }
        });
        // Step 2
        let mailOptions = {
            from: "huuhao1999testpttkhttt@gmail.com", // TODO: email sender
            to: EmailUser, // TODO: email receiver
            subject: titlemail,
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