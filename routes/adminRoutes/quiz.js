// Import the required modules and models
const express = require('express');
const router = express.Router();
const Quiz = require('../../schemas/Quiz')
const Admin = require('../../schemas/Admin')
const Question = require('../../schemas/Question');
const fetchadmin = require('./fetchadmin');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'HAR_HAR_MAHADEV';

// Define a route to handle the POST request
router.post('/createquiz', fetchadmin,async (req, res) => {
  try {
    // Get the request data from the body
    const { quizTime, questions } = req.body;

    // Create a new quiz and save it to the database
    const newQuiz = new Quiz({
      quizTime,
      questionCount: questions.length,
      questions
    });
    const savedQuiz = await newQuiz.save();
    savedQuiz.admin = req.admin.id;
    console.log(savedQuiz)
    for(let i=0; i<questions.length; i++){
        savedQuiz.questions[i].questionId = i;
        savedQuiz.questions[i].questionText = req.body.questions[i].questionText;
        savedQuiz.questions[i].options = req.body.questions[i].options;
        savedQuiz.questions[i].marks = req.body.questions[i].marks;
        savedQuiz.questions[i].correctOptions = req.body.questions[i].correctOptions;
    }
    // Create the questions and associate them with the quiz
    // const questionIds = [];
    // for (const questionData of questions) {
    //   const newQuestion = new Question({
    //     ...questionData,
    //     questionId: questionIds.length + 1
    //   });
    //   const savedQuestion = await newQuestion.save();
    //   questionIds.push(savedQuestion._id);
    // }
    // savedQuiz.questions = questionIds;
    await savedQuiz.save();

    // Send the response with the saved quiz data
    res.status(201).json(savedQuiz);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router
module.exports = router;





