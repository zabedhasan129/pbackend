const blankinput = require("../handlre/blankinput");

let registrationController = (req,res) =>{
    const {username,email,password} = req.body;
    if(blankinput(username)){
        res.send({error:"username required"})
    }
    else if(blankinput(email)){
        res.send({error:"Email required"})
    }
    if(blankinput(password)){
        res.send({error:"password required"})
    }
    console.log(username,email,password)
       
}

module.exports = registrationController;