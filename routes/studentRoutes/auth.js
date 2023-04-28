const express = require('express')
const router = express.Router()
const Student = require('../../schemas/Student')
const Admin = require('../../schemas/Admin')
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchstudent = require('./fetchstudent')

const  JWT_SECRET = 'HAR_HAR_MAHADEV';
//ROUTE-1: Create Admin

//ROUTE-2: Create Student
router.post('/createstudent',[
    body('username','Enter a valid username').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5})
], async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        let student = await Student.findOne({email: req.body.email});
        if(student){
            return res.status(400).json({ error: "Sorry a user with this email already exists"})
        }
        
        const salt = await bcrypt.genSalt(11);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //Create a new student

        student = await Student.create({
            username: req.body.username,
            password: secPass,
            email: req.body.email,
        })
        
        const data = {
            student: {
                id: student.id
            }
        }
        const authtoken  = jwt.sign(data, JWT_SECRET);

        res.json({authtoken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }
})
//ROUTE-3 : Login as Admin

//ROUTE-4: student login
router.post('/studentlogin',[
    body('email','Enter a valid email!').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req,res) =>{
    let success = false;
    //If errors, then return bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const loginType = 'student'
    
    const { email, password } = req.body;
    try{
        let student = await Student.findOne({email});
        if(!student){

            success = false;
            return res.status(400).json({ error: "Please try to login with valid credentials"})
        }

        const passwordCompare = await bcrypt.compare(password, student.password);

        if(!passwordCompare){
            success = false;
            return res.status(400).json({ loginType, success, error: "Please try to login with correct credetials"})
        }

        const data = {
            student:{
                id: student.id,
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

module.exports = router;