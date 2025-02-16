const mongoose = require('mongoose');
require('dotenv').config();


//defining the mongo db connection url local 

// const mongoURL = process.env.MONGODB_URL_LOCAL;//hotel can be replace with some other database name 


//definig the database og mongo for online connection URL 
const mongoURL = process.env.MONGODB_URL;//hotel can be replace with some other database name

//set up MongoDb connection 
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
//get the default connection 
//mongoose maintain default connection object representing the mongodb connnection  
const db = mongoose.connection;


//defining event listners for db connection
db.on('connected', () => {
  console.log('connected to mongo db server');
})
db.on('error', (err) => {
  console.error('mongo db connection error : ', err);
})
db.on('disconnected', () => {
  console.log('mongo db server disconnected');
})

module.exports = db;