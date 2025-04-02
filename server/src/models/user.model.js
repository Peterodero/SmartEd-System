const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	password: String,
	quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: false },
    score: { type: Number, required: false },
    totalQuestions: { type: Number, required: false },
	role: { type: String, enum: ['student', 'teacher', 'parent'], default: 'student' }
})

module.exports = mongoose.model('User', userSchema);