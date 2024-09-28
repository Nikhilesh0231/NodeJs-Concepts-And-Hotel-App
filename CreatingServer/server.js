const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('This is Nikhilesh Tiwari')
})
app.get('/help',(req,res)=>{
  res.send('This is Nikhilesh Tiwari,how i can help you')
})
app.get('/help/contact',(req,res)=>{
  var customizedContactInfo={
    name:'Nikhilesh Tiwari',
    email:'nikhilesh.tiwari@outlook.com',
    phone:'+91 900 000 0000',
  } 
  res.send(customizedContactInfo); 
})
app.post('/details',(req,res)=>{
    res.send("data is saved");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})