const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/user.model');
const adminAddAdminRouter = express.Router();
const { verifyToken, isAdmin } = require('../../middlewares/authMiddlewares');

// POST /users/create-admin
adminAddAdminRouter.post("/admin/create-admin", verifyToken, isAdmin, async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new User({
        name,
        email,
        password: hashedPassword,
        role: "admin",
      });
  
      await newAdmin.save();
      res.status(201).json({ message: "Admin created successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error creating admin" });
    }
  });
  
module.exports = adminAddAdminRouter;  