// 400 Bad Request: Client-side error due to invalid syntax or parameters in the request.
// 404 Not Found: Server-side error indicating that the requested resource does not
// exist.
// 500 Internal Server Error: Server-side error indicating an unexpected condition
// preventing .
// Authentication:(like Identification) is login or (registration) and after
// login we got token (unique id) and used 
// for Authorization(giving access to user with unique id i.e token)
// for restricted page.
// Encryption : it has two part i.encrypted message and ii. secreate key
// secreate key help to decrypte the token
// In jwt authentication three part there 
// i.Header:it containe encryption algorithem and types of token .
// ii.Payload contain extra information by which token can be created.
// iii.Veryfing Signature contain secreate key by secreate key help to 
// decrypte the token and use for authorisation.

const express=require('express')
const {connection} = require('./db.js')
const {UserModel} =require('./model/user.model.js')
const cors=require('cors')
 const { userRoute } = require('./router/user.router.js')
require('dotenv').config()


const app=express()
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('Home Page')
    })
    app.use('/users',userRoute)

app.listen(process.env.port||4040,async()=>{
try {
    await connection
    console.log('Connect to mongodb') 
//    connection.disconnect() 
} catch (error) {
    console.log(error.message)
}

    console.log(`Port ${process.env.port} is running `)
})