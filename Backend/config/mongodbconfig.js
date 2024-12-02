const mongoose = require('mongoose');   
let mongodbconfig = ()=>{
    mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.yddjriz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log('Database Connected!'));
}

module.exports = mongodbconfig;

