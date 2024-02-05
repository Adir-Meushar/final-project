const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcrypt');

const RoleType={
    user:10,
    admin:20,
}
const nameSchema = new mongoose.Schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
  });
  
const userSchema=new mongoose.Schema({
    fullName:nameSchema,
    phone: { type: String, required: true },
    email:{type:String,required:true,unique:true},
    password: {type: String, required: true },
    roleType:{type:Number,default:RoleType.user},
    createdTime: { type: String, default: () => moment().format('D-M-Y HH:mm:ss') }
}); 

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
      return next();
  }

  try {
      user.password = await bcrypt.hash(this.password, 10);
      next();
  } catch (err) {
      return next(err);
  }
});

const User = mongoose.model('users', userSchema);

module.exports = { User, RoleType };