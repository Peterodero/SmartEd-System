const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	password: String,
	quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
	role: { type: String, enum: ['student', 'teacher', 'parent'], default: 'student' }
})

module.exports = mongoose.model('User', userSchema);