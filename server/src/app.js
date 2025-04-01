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


// GEMINI_API_KEY = AIzaSyBsm7086P-LUdJ61s07sIR-v7PApUAJqjI
// MONGO_URL = mongodb+srv://peterodero450:j3MCnkxCAQk8BtZN@edcluster.t5egyrg.mongodb.net/?retryWrites=true&w=majority&appName=EdCluster 
// PORT = 3000
// JWT_SECRET = aea376b019ebe5a87a122f805b0a2874b5c30c267e10c0a4e3df5ff4468929021c6b965d887659fe341eb9b007b2491faed0758238573e616bb542907f3d9653