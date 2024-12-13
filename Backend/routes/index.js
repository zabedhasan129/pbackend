const express = require("express");
const _ = express.Router()
const apiRoutes = require("./api")

let apiBaseUrl = process.env.BASEURL

_.use(apiBaseUrl,apiRoutes)


_.use((req,res)=>{
    res.send({error: "sawaon sir vala na heti khali areee pochay"})
    
})



module.exports = _;