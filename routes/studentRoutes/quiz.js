const express = require('express');
const router = express.Router();
const Quiz = require('../../schemas/Quiz')
const fetchstudent = require('./fetchstudent')
//Get quiz 
router.get('/getquiz/:id',fetchstudent,async (req,res) => {
    if(!req.params.id){
        return res.status(400).send("Please enter valid quiz id!")
    }

    let quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    return res.send(quiz);
})




module.exports = router;