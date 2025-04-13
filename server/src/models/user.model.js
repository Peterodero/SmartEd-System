const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: { type: String, unique: true },
	password: String,
	role: { 
		type: String, 
		enum: ['student', 'lecturer','admin'], required: true 
	},
	department: { type: String },
	resetOTP: { type: String }, // The OTP sent to the user
  	otpExpires: { type: Date }  // Expiry time for the OTP 
})

module.exports = mongoose.model('User', userSchema);