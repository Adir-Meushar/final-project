require('dotenv').config();
const express=require('express');
const cors =require('cors');
const mongoose=require('mongoose');
const chalk=require('chalk'); 
const loggerMiddleware=require('./handlers/helpers/logger');
const port=process.env.PORT;

async function main(){
    await mongoose.connect(process.env.REMOTE_URL);
    console.log(chalk.blue('Connection Established'));
}
main().catch(err=>console.log(chalk.red(err)));

const app=express();

app.use(express.json());

app.use(cors({ 
    origin: true, 
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

app.use(loggerMiddleware);

app.listen(port,()=>{
    console.log(chalk.blue((`Listening to port ${port}`)));
});

require('./handlers/authentication/signup')(app);
require('./handlers/authentication/login')(app);
require('./handlers/user/user')(app);
require('./handlers/products/product')(app);
require('./handlers/products/category')(app);