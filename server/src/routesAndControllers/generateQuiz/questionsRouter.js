const express = require('express');
const router = express.Router();
const questionController = require("./questionsController")

// GET /api/questions - Generate exam questions
router.get('/', questionController.generateQuestions);

module.exports = questionrouter;