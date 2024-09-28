const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware,generateToken} = require('./../jwt')

//Post route to add person
router.post('/signup', async (req, res) => {
  try {
    const data = req.body;//Assuming the request body contains the persons data

    //create a new person document using the mongoose models
    /*
    //by this can also save the dat a if there a lot of field become tough to save
    const newPerson = new Person();
    newPerson.name = data.name;
    newPerson.email = data.email;
    newPerson.age = data.age;
    newPerson.mobile = data.mobile;
    newPerson.address = data.address;
    */

    //create a new person document using the mongoose models

    const newPerson = new Person(data);

    //Save the new Person to the data base

    const response = await newPerson.save();
    console.log('data saved');

    const payload = {
      id:response.id,
      username:response.username 
    }
    const token = generateToken(payload);
    console.log(JSON.stringify(payload));
    console.log("Token is : ",token)

    res.status(200).json({response:response,token : token});

  } catch (error) {
    console.log("Error saving person ", error);
    res.status(500).json({ error: 'Internal server error' })
  }
})

//Login Routes

router.post('/login',async(req,res)=>{
  try {
    //Extract the username and password from request body
    const {username,password} = req.body;

    //Find the user by username
    const user =await Person.findOne({username:username});

    //if user does not exist or password does not match , return error
    if(!user || !(await user.comparePassword(password))){
      return res.status(404).json({error:"Invalid username or password"})
    }

    // Now if both password and username matched then genrate a token
    const payload = {
      id:user.id,
      username:user.username
    }
    const token = generateToken(payload);

    //return token as response
    res.json({token })

  } catch (error) {
    console.log("Error logging in person ", error);
    res.status(500).json({ error: 'Internal server error' }) 
  }
})

//Profile Route
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
  try {
    //Get the userData from the token
    const userData = req.user;
    console.log("User Data is : ",userData);
    const userId = userData.id;
    const user =await Person.findById(userId);
    res.status(200).json({user});
  } catch (error) {
    console.log("Error getting profile ", error); 
    res.status(500).json({ error: 'Internal server error' })
  }
})




//get the method to get the person 
router.get('/',jwtAuthMiddleware, async (req, res) => {
  try {
    const persons = await Person.find();
    console.log('data fetched successfully');
    res.status(200).json(persons);
  } catch (error) {
    console.log("Error fetching persons ", error);
    res.status(500).json({ error: 'Internal server error' })
  }
})
//getting the data of the person according their work 
router.get('/:work', async (req, res) => {
  try {
    const work = req.params.work;// Extract the work type from the URL parameter
    if (work == 'chef' || work == 'manager' || work == 'waiter') {
      const person = await Person.find({ work: work });
      console.log('data fetched successfully');
      res.status(200).json(person);
    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }
  } catch (error) {
    console.log("Error fetching persons ", error);
    res.status(500).json({ error: 'Internal server error' })
  }
})

//Updating the existing record 
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;// Extract the id from the URL parameter
    const updatedPersonData = req.body;// Extract the data from the request body
    const person = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,//return the updated data
      runValidators: true,//run mongoose data
    });
    if (!person) {
      return res.status(404).json({ error: 'person not found' })
    }
    console.log('data updated successfully');
    res.status(200).json(person);
  } catch (error) {
    console.log("Error updating person ", error);
    res.status(500).json({ error: 'Internal server error' })
  }
})
//delete the existing record
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;// Extract the id from the URL parameter 
    const person = await Person.findByIdAndDelete(personId);
    if (!person) {
      return res.status(404).json({ error: 'person not found' })
    }
    console.log('data deleted successfully');
    res.status(200).json({ message: 'person deleted successfully' })
  } catch (error) {
    console.log("Error deleting person ", error);
    res.status(500).json({ error: 'Internal server error' })
  }

})


module.exports = router;