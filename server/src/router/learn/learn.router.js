const express = require('express');
const { generateQuestions } = require('./genQuiz.controller');

const learnRouter = express.Router();

learnRouter.get("/learn", generateQuestions)

module.exports = learnRouter;       