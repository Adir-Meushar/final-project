const { User, RoleType } = require("../user/user-model");
const { userValidationSchema } = require("../user/userValidation");


module.exports=app=>{
    app.post('/users/signup',async(req,res)=>{
        const{fullName,phone,email,password,address}=req.body;
        const {error,value}=userValidationSchema.validate(req.body, { abortEarly: false });
        if (error) {
          return res.status(400).json({ error: error.details.map(detail => detail.message) });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        try{
        const user=new User({
          fullName,
          phone,
          email,
          password,
          address
      })
      //set first user created to admin//
      const count=await User.where().count();
      if(count==0){
        user.roleType=RoleType.admin;
      }else{
        user.roleType=RoleType.user;
      } 
          const newUser=await user.save();
          res.status(200).send(newUser);
        }catch(error){
            res.status(500).send({ error: 'Error creating user' });
        }
    })
}   