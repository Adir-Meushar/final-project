const mongoose=require('mongoose');
const moment = require('moment');


  const imgSchema = new mongoose.Schema({
    url: String,
    alt: String
  });  
  
  const nutritionalValue = new mongoose.Schema({
    calories:{type:Number,required:true},
    carbohydrates:{type:Number,required:true},
    protein:{type:Number,required:true},
    fat:{type:Number,required:true},
  }); 

  const schema= new mongoose.Schema({
    category:{type:String,required:true},
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    sale:{type:Boolean,default:false}, 
    nutritionalValue:nutritionalValue,
    img:imgSchema,
    favorite:{type:Array},
    unit: { type: String, enum: ['kg', 'package','unit'], default: 'kg' }, // Include unit field
    createdTime: { type: String, default: () => moment().format('D-M-Y HH:mm:ss') }
    });

exports.Product=mongoose.model('products',schema);