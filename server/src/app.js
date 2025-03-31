const express = require('express');
const cors = require('cors');

const authRoutes = require('./routesAndControllers/evaluateAuth/authRoutes');
const studentRoute = require('./routesAndControllers/evaluateAuth/studentRoute');
const genQuizRouter = require('./routesAndControllers/generateQuiz/genQuiz.router');
const evaluateQuizRouter = require('./routesAndControllers/evaluateQuiz/evaluateQuiz.router');
const learnRouter = require('./routesAndControllers/learn/learn.router');

const app = express();
 
app.use(express.json());  
app.use(cors({
	origin: 'http://localhost:5173'  
}));

app.use('/auth', authRoutes);
app.use(studentRoute);
app.use(genQuizRouter);
app.use(evaluateQuizRouter);
app.use(learnRouter)

module.exports = app;