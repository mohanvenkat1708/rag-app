// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema with the required fields
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student', 'parent', 'staff'], required: true },
});

// // Pre-save hook to hash the password before saving the user to the database
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
