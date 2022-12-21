const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt_sign = 'Godspeedallmight'
const jwtoken = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

//Route 1: Create a User using : POST "/api/authen/signup". Doesn't Require Auth
router.post('/signup',[
        body('email', 'Enter a Valid Email').isEmail(),
        body('name', 'Enter a Valid Name').isLength({ min: 3 }),
        body('password', 'PassWord length minimum 8').isLength({ min: 8 }),
], async (req, res)=>{

        let success=false

        // console.log(req.body);
        // Error - Validations - If Errors find and return them
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
        }

        // Securing Password - Hashing
        const salt = await bcrypt.genSalt(10);
        const securepass = await bcrypt.hash(req.body.password, salt);

        try {
        // check whether User Exists already here
                let user = await User.findOne({email: req.body.email});
                if(user)
                {
                        return res.status(400).json({success, error: "Email Already Exisits !!"})
                }
                user = await User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: securepass,
                })
                //new Comment
                // .catch(err=> {res.json({error: 'Enter A Unique and valid Email'})}) - Will always not get only email error
                // res.send(req.body);
                // Giving user a token and not all his info
                const datas = {
                     user: {
                        id: user.id
                     }
                }
                success=true
                const authtoken = jwtoken.sign(datas, jwt_sign);
                res.json({success, authtoken})

        } catch (error) {
                    console.error("Hello World " + error.message);  
                    res.status(500).send(success, "Internal Error Occurred");   
        }
})


//Route 2: Login Exisiting User - endpoint(/api/authen/login)
router.post('/login',[
        body('email', 'Enter a Valid Email ').isEmail(),
        body('password', 'Password cannot be Blank ').exists(),
], async (req, res)=>{
        let success=false
        // console.log(req.body);
        // Error - Validations - If Errors find and return them
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;
        try {
             let user = await User.findOne({email});
             if(!user)
             {
                return res.status(400).json({success, error: "Invalid Credentials !!"});
             }    

             // Comparing passwords
             const passcom = await bcrypt.compare(password, user.password);
             if(!passcom)
             {
                return res.status(400).json({success, error: "Invalid Credentials !!"});
             }

             //Payload if user found
             const payload = {
                user: {
                   id: user.id
                }
             }
             success=true
             const authtoken = jwtoken.sign(payload, jwt_sign);
             res.json({success, authtoken}) 

        } catch (error) {
                console.error(error.message);  
                res.status(500).send("Internal Error Occurred");   
        }
})

//Route 3: Show Details of Logged in User - endpoint(/api/authen/showuser)
router.post('/showuser', fetchuser , async (req, res)=>{
        try {
             userid = req.user.id
             const user = await User.findById(userid).select("-password");
             res.send(user)
        } catch (error) {
                console.error(error.message);  
                res.status(500).send("Internal Error Occurred");      
        }
})


module.exports = router