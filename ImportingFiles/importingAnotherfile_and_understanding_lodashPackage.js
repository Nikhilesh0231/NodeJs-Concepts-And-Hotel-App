//importing notes file in this file
const notes = require('./notes');
var _ = require('lodash');

console.log('server file is running');

var age = notes.age;
console.log(age);

var result = notes.addNumber(4,5);
console.log(result);


var data =['person','person','name','name',3,5,3,5,1,1,'age','5'];

var uniqueData = _.uniq(data);
console.log(uniqueData);

console.log(_.isString('nikhilesh'))//true
console.log(_.isString(9))//false