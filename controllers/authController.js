const user = require('../model/userModel')
const sendEmail = require('../sendMail')
const authController = {
    GetEmail:async(req,res)=>{
        try{
            const email = req.body.email
        const User = await user.findOne({email:email})
       
       if(!User){
            res.status(404).json({message:"User not in there"})
        }
        else{
            console.log(User)
            const str = ["0","A","B","4","C","D","a","b","8","C","d","f","F","5","g","h","G","6","H","I","J","K","i","j","3","k","l","m","n","N","1","M","L","O","9","P","p","o","q","r","s","t","T","R","Q","S","u","U","V","v","w","y","W","7","X","x","Y","Z","z"]
            const RandomString = `${str[Math.floor(Math.random()*str.length)]+str[Math.floor(Math.random()*str.length)]+str[Math.floor(Math.random()*str.length)]+str[Math.floor(Math.random()*str.length)]}`
            console.log(RandomString)
            const Expiry = Date.now()+60*60*1000
            console.log(Expiry)
            User.randomString = RandomString
            User.randomStringExpiry = new Date(Expiry)
            await User.save()
            console.log(User)
            const link = `https://passwod-reset.netlify.app/password_reset?rs=${RandomString}&email=${User.email}`
            console.log(link)
            const html = `
            <h1>Email Verification</h1>
            <p>Click this link to Change the password</p>
            <a href = ${link} target="_blank">Reset Your Password </a>`
            
             const mail = await sendEmail(User.email,"Verify your Email",html)
            console.log("Yes success",mail)
            res.json({message:"Successfully Sent it!!!",email })
        }

        }catch(error){
           console.log(error)
        }
    },

   
    logIn_Create:async(req,res)=>{
        const {email,password} = req.body
        console.log({email,password})
        try{
           const IsUserExist = await user.findOne({email})
           if(!IsUserExist) {
             return res.status(404).json({message:"User is not Exist"})
           }
          const userPW = IsUserExist.password
          if(userPW !== password){
            return res.status(404).json({message:"Invalid Password"})
          }
          res.status(200).json({message:"Successfully Logged In!"})
        }
        catch(err){
            res.status(500).json({message:"Server Error ",err:err.message})
        }
    },
    newPassword : async(req,res)=>{
        try{
           const{ password1,password2 }= req.body
        //    
          if(password1!=password2){
            return res.status(404).json({message:"Password are not match"})
        }
        // Getting params from FrontEnd
         const {rs,email} = req.query
         
        //  Find that Specific user Using the randomString
         const Us = await user.findOne({randomString:rs})
         console.log(Us)
         if(Us.randomString===rs){
            const Updated = await user.updateOne({randomString:rs},{$set:{password:password2,randomString:null}})
            console.log(Updated)
         }
         console.log(Us)
        console.log(password1,password2);
        res.json({message:"Successfully Changed !!!"})
        }
        catch(err){
            res.json({message:"Server Error!!",err:err.message})
        }
    },
    CreateUser:async(req,res)=>{
        try{
          const {name,email,password} = req.body
          const existUser = await user.findOne({email})
          if(existUser){
            return res.status(404).json({message:"User is already exist"})
          }
          const newUser = new user({name,email,password})
          console.log(newUser)
          await newUser.save()
          res.status(201).json({message:"Successfully Created" , newUser})
        }
        catch(err){
            res.status(500).json({message:"Server Error ",err:err.message})
        }
    }
}
module.exports = authController