const blankinput = require("../handlre/blankinput");
const emailValidator = require("../handlre/emailValidator");
const validPassword = require("../handlre/validPassword");
const User = require("../model/userModel")
const bcrypt = require('bcrypt');

let registrationController = async (req, res) => {
    const { username, email, password } = req.body;
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
        if (existingemail.length > 1) {
            res.send({ error:`${email} already exixts`})
        }
        else {
            bcrypt.hash(password, 10, function(err, hash) {
                console.log(hash)
                let user = new User({
                    username: username,
                    email: email,
                    password: hash,
                });
                user.save();
                res.send({
                    username : user.username,
                    email: user.email,
                    role: user.role
                });
            });
            
        }

        



    }
    

}

module.exports = registrationController;