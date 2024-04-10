const mongoose=require('mongoose')
const { v4: uuidv4 } = require('uuid');
const userSchema=mongoose.Schema({
    
    studentname:String,
    address:String,
    phone:Number,
    dob:String,
    category:String,
    studentId:String
})

userSchema.pre('save', function(next) {
    if (!this.studentId) {
        const uuid = uuidv4().replace(/-/g, '').slice(0, 10); // Generate UUID and extract first 10 characters
        this.studentId = parseInt(uuid, 16); // Convert UUID to base 16 (hex) and then to integer
    }
    next();
});

const UserModel=mongoose.model('studentregister',userSchema)

module.exports={
    UserModel
}