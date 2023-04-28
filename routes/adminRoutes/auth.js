const express = require('express')
const router = express.Router()
// const Student = require('../schemas/Student')
const Admin = require('../../schemas/Admin')
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchadmin = require('./fetchadmin')
const JWT_SECRET = 'HAR_HAR_MAHADEV';

//SIGN UP ADMIN
router.post('/createadmin',[
    body('username','Enter a valid username').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({min: 5}),
], async (req,res) =>{
    //If there are errors, return bad reques and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        //Check whether user with this email exists already

        let currUsr = await Admin.findOne({email: req.body.email});
        if(currUsr){
            return res.status(400).json({error : "Sorry this email accout already exist!"})
        }
        let checkUserName = await Admin.findOne({username: req.body.username});
        if(checkUserName){
            return res.status(400).json({error: "Username already exists"})
        }
        

        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);

        currUsr = await Admin.create({
            username: req.body.username,
            password: secPass,
            email: req. body.email,
        })
        console.log(currUsr);
        const data = {
            admin:{
                id: currUsr.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET)

        res.json({authtoken})
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
}
)

//LOGIN ADMIN
router.post('/adminlogin',[
    body('email','Enter a valid email!').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req,res) =>{
    let success = false;
    //If errors, then return bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try{
        let admin = await Admin.findOne({email});
        if(!admin){
            success = false;
            return res.status(400).json({ error: "Please try to login with valid credentials"})
        }

        const passwordCompare = await bcrypt.compare(password, admin.password);

        if(!passwordCompare){
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credetials"})
        }

        const data = {
            admin:{
                id: admin.id,
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken});
        
    }catch (error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});
router.post('/getadmin',fetchadmin,async(req,res) => {
    try{
        userId = req.admin.id;
        console.log(req.admin);
        const user = await Admin.findById(userId).select("-password");
        res.send(user);
    }
    catch(error){
        res.status(500).send("Internal sever error");
    }
})
module.exports = router;