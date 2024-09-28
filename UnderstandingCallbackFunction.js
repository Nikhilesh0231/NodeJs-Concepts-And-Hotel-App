// function add(a,b){
//   return a+b;
  
// }

// var add = function(a,b){
//   return a+b;
// }

//Arrow function
// var add = (a,b) =>{
//   return a+b;
// }

// var add = (a,b) => a+b;

// var result = add(3,7);
// console.log(result); 

// (function (){
//   console.log("Nikhilesh");
// })();

/*
function callback(){
  console.log("now adding is successfully completed");
}

const add = function(a,b,callback){
  var result = a+b;
  console.log(result);// main function work completed here.
  callback();//because this function is called in main function thats why it is called as callback function 
}


add(13322332,5,callback);
*/  

//Writing above function in different form
const add = function(a,b,nikhileh){
  var result = a+b;
  console.log(result);
  nikhileh();
}

// add(2,3,function(){
//   console.log('add complete')
// })

add(2,4,()=>console.log('add complete'))