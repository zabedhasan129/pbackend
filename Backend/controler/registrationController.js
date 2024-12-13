const blankinput = require("../handlre/blankinput");
const emailValidator = require("../handlre/emailValidator");
const validPassword = require("../handlre/validPassword");
const User = require("../model/userModel")
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator')
const nodemailer = require("nodemailer");



let registrationController = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("fronend send data", req.body)
    if (blankinput(username)) {
        res.send({ error: "username required" })
    }
    else if (blankinput(email)) {
        res.send({ error: "Email required" })
    }
    else if (!emailValidator(email)) {
        res.send({ error: "valid email required" })
    }
    else if (blankinput(password)) {
        res.send({ error: "password required" })
    }
    else if (validPassword(password)) {
        res.send({ error: "password is short" })
    }
    else {

        let existingemail = await User.find({ email: email })
        console.log(existingemail)
        if (existingemail.length > 10) {
            res.send({ error: `${email} already exixts` })
        }
        else {
            let otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets:false,
                specialChars: false


            });
            console.log(otp)
            bcrypt.hash(password, 10, async function (err, hash) {
                console.log(hash)
                let user = new User({
                    username: username,
                    email: email,
                    password: hash,
                    otp:otp,
                });
                user.save();

                

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    
                    secure: false, // true for port 465, false for other ports
                    auth: {
                      user: process.env.MAIL_SENDER_USER,
                      pass: process.env.MAIL_SENDER_PASS,
                    },
                  });
                // await keyword does not work globally......................
                  const info = await transporter.sendMail({
                    from: process.env.MAIL_SENDER_USER, // sender address
                    to: email, // list of receivers
                    subject: "Email varification OTP", // Subject line
                    text: "Hello world?", // plain text body
                    html: `<p>Email Varification OTP<b>OTP:</b> ${otp} </p>`, // html body
                  });





                res.send({
                    username: user.username,
                    email: user.email,
                    role: user.role
                });
            });

        }





    }


}

module.exports = registrationController;