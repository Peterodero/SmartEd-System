const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/models/user.model'); // adjust path if needed

async function createAdmin() {
  try {
    await mongoose.connect("mongodb+srv://peterodero450:j3MCnkxCAQk8BtZN@edcluster.t5egyrg.mongodb.net/?retryWrites=true&w=majority&appName=EdCluster");

    const existingAdmin = await User.findOne({ email: 'oderopeter287@gmail.com' });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin@smarted', 10);

    const admin = new User({
      name: "Peter Admin",
      email: "oderopeter287@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("Admin user created successfully!");
  } catch (err) {
    console.error("Error creating admin user:", err);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
