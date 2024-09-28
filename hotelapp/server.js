const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());//all data is stored req.body 
const PORT = process.env.PORT||3000


//Middleware function 
const logRequest = (req,res,next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();//Move on the next places 
} 
app.use(logRequest); 

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})
app.get('/',function(req, res){
  res.send("Welcome to my hotel...How can i help you ?,we have list of menus");
});

//importing the person router file
const personRoutes = require('./routes/personRoutes');

//Use the router
app.use('/person',personRoutes);

//importing the menu router file
const menuRoutes = require('./routes/menuRoutes');
//Use the router
app.use('/menu',menuRoutes);



app.listen(PORT, () => {
  console.log('server is running on port 3000');
}) 