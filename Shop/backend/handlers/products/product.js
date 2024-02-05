const guard=require('../helpers/guard');
const { getUserInfo } = require('../helpers/jwtUtils');
const { RoleType } = require('../user/user-model');
const{Product}=require('./product-model');
module.exports=app=>{
    app.post('/products',guard,async(req,res)=>{ 
        const userToken=getUserInfo(req,res);
        if(userToken.isAdmin!=RoleType.admin){
            return res.status(401).send({
                error: {
                  code: 401,
                  message: 'Unauthorized',
                  details: 'User authentication failed.',
                },
              });
        }

        const{category,title,description,price,sale,nutritionalValue,img}=req.body;

       try{
        const product=new Product({
            category,
            title,
            description,
            price,
            sale,
            nutritionalValue,
            img,
        });

        const newProduct= await product.save();
        res.status(200).send(newProduct);
       }catch(error){
        res.status(500).send({ error: 'Error creating product'});
       }
    });
};