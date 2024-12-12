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
            bcrypt.hash(password, 10, async function (err, hash) {
                console.log(hash)
                let user = new User({
                    username: username,
                    email: email,
                    password: hash,
                });
                user.save();

                let otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets:false,
                    specialChars: false


                });
                console.log(otp)

                const transporter = nodemailer.createTransport({
                    host: "gmail",
                    port: 587,
                    secure: false, // true for port 465, false for other ports
                    auth: {
                      user: "maddison53@ethereal.email",
                      pass: "jn7jnAPss4f63QBp6D",
                    },
                  });
                // await keyword does not work globally......................
                  const info = await transporter.sendMail({
                    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
                    to: "bar@example.com, baz@example.com", // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: "<b>Hello world?</b>", // html body
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