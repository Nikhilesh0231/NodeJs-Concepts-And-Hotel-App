const mongoose = require('mongoose');


var menuItemSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  taste:{
    type:String,
    enum:["spicy","sweet","sour"],
    required:true
  },
  isDrink:{
    type:Boolean,
    default:false
  },
  ingredients:{
    type:[String],
    default:[]
  },
  num_sales:{
    type:Number,
    default:0
  }
})

const MenuItem = mongoose.model('Menu',menuItemSchema);
module.exports = MenuItem;