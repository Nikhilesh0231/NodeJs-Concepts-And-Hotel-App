const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define Persons Schema

const personsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true
  },
  username:{
    type: String,
    required: true,     
  },
  password:{
    type: String,
    required: true,
  }, 
});
personsSchema.pre('save',async function (next) {
  const person = this;
  //hash the password onlt if it has been modified or its a new record 
  if (!person.isModified('password')) return next();
  try {
    //hash password generation
    const salt = await bcrypt.genSalt(10);
    //hash Password
    const hashedPassword = await bcrypt.hash(person.password, salt); 
    //overwride the plain password with hashed password 
    person.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
})
personsSchema.methods.comparePassword = async function(candidatePassword) {
  try {
     const isMatch = bcrypt.compare(candidatePassword,this.password);
     return isMatch;
  } catch (error) {
    throw error;
  }
  
}

// Create Model 

const Person = mongoose.model('Person', personsSchema);
module.exports = Person;