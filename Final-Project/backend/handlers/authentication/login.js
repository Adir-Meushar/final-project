const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require("../user/user-model");
const { loginValidationSchema } = require('../user/userValidation');



module.exports=app=>{
    app.post('/users/login',async(req,res)=>{
        
        const { error, value } = loginValidationSchema.validate(req.body);
        const{email,password}=value;
        const user=await User.findOne({email});

        if(!user){
            return res.status(401).send('Email or password is incorrect.');
        }

        const passwordMatch=await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).send('Email or password is incorrect.');
        }
        const token = jwt.sign({ 
            userId: user._id, 
            isAdmin: user.roleType, 
            firstName: user.fullName ? user.fullName.first : '',},
            process.env.JWT_SECRET, { expiresIn: '1h' });

            res.send(token);
    })
} 