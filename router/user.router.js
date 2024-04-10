
const express=require('express');
const { v4: uuidv4 } = require('uuid'); 
const {UserModel}=require('../model/user.model')
const userRoute=express.Router()


    
    // crud operation
    
    // create
    userRoute.post('/add', async (req, res) => {
        try {
            const payload = req.body;
            console.log(payload);
    
            // Check if the user already exists
            const existingUser = await UserModel.findOne({ 
                studentname: payload.studentname,
                address:payload.address,
                dob:payload.dob,
                phone:payload.phone,
                
             });
    
            if (existingUser) {
                // If user already exists, send a message and return
                return res.status(400).send({ 'msg': 'User already registered' });
            }
    
            // Create a new user instance
            const user = new UserModel(payload);
            console.log(user);
    
            // Save the new user to the database
            await user.save();
    
            // Send a success message
            return res.status(200).send({ 'msg': 'New user has been added' });
    
        } catch (error) {
            // Handle any errors and send an error response
            console.error(error);
            return res.status(400).send(error.message);
        }
    });
    
    
    // read 
    // handling query we do not need saparate routes and for param we need separate routes
    
    userRoute.get('/',async(req,res)=>{
    const query=req.query
    console.log(query)
    // or 
    // const query1 =req.query.city
    // if not query will pass then whole data will show because then 
    // req.query will be empty object and empty object will be equal to UserModel.find()
        try {
            // if we put query like localhost:8080/users?name=Himanshu&age=21 then it work 
            // like( const users=await UserModel.find({name: 'Himanshu', age: '21'}))
            const users=await UserModel.find(query)
          
    res.status(200).send(users)
        } catch (error) {
           res.status(400).send({'msg':error.message}) 
        }
    })
    
    userRoute.patch('/update/:userID',async(req,res)=>{
    const {userID}=req.params;
    const payload=req.body;
    console.log(userID)
    
    try {
      // await UserModel.findByIDAndUpdate('filter','payload')
    await UserModel.findByIdAndUpdate({_id:userID},payload)  
    res.status(200).send('Users has been updated')
    } catch (error) {
        res.status(400).send('Users has not been updated')
    }
    })
    
    //delete 
    userRoute.delete('/deleteid/:userId',async(req,res)=>{
    
        const {userId}=req.params
        // console.log(params)
        try {
            await UserModel.findByIdAndDelete({_id:userId})
            res.status(200).send({'msg':'Users has been deleted'})
        } catch (error) {
            res.status(400).send({'msg':'Users has not been deleted'})
        }
      
    
    })

    module.exports={
        userRoute
    }