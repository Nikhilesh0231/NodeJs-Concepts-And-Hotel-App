const jsonstring = '{"name":"Nikhilesh","age":25,"city":"Pune","country":"India"}';                        
const jsonObject = JSON.parse(jsonstring);
console.log(jsonObject.name); // Nikhilesh

const ObjectToConvert = {
  name : "Nikhilesh",
  age : 25,
}
const jsonstringified = JSON.stringify(ObjectToConvert);
console.log(jsonstringified);

//JSON is a string 
console.log(typeof(jsonstringified));//string