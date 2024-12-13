require('dotenv').config()//6
const express = require("express");//1
var cors = require('cors')//3
const app = express();//2
const secureApi = require("./middleware/secureApi")//5
const routes = require("./routes")//4
const mongodbconfig = require("./config/mongodbconfig")//7

mongodbconfig();
app.use(cors());
app.use(express.json());
app.use(routes)


// app.post("/api/auth/registration",secureApi,(req,res)=>{
//     console.log((req.body))
// });

app.listen(8000,()=>{
    console.log("Port Connectd")
});