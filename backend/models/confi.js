const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const url = process.env.MONGODB_URL
  

const mongooseConnect = () => {
    mongoose.connect( url , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    
    })
  .then(() => console.log("mongoDB connected"))
  .catch((error) => console.log(error, "can not connect to Database"))
}

module.exports = mongooseConnect;