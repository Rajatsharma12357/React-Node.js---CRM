const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const connectDb = () =>{
    return mongoose.connect(process.env.DB_URL)
    // return mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("connected sucessfully");
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports = connectDb