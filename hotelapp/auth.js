const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;// or this strategy is also called username and password strategy
const Person = require('./models/Person'); 
passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
  //Authrentication logic
  try {
    // console.log("Recived Credentials",USERNAME,password); 
    const user =await Person.findOne({username:USERNAME});
    if(!user){
      return done(null,false,{message:'Invalid Username'});
      }
    const isPasswordMatch =await user.comparePassword(password);
    if(isPasswordMatch){
      return done(null,user);
    }else{
      return done(null,false,{message:'Invalid Password'});
    }
  } catch (error) {
    return done(error);
  }   
}));

module.exports = passport;