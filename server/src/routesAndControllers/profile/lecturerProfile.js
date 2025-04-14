const bcrypt = require("bcrypt");
const User = require("../../models/user.model");

// Get user by ID
exports.getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch user" }); 
    }
  };
  
  // Update user
  exports.updateUser = async (req, res) => {
    try {
      const updates = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to update user" });
    }
  };
  exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });
  
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(newPassword, salt);
      user.password = hashed;
      await user.save();
  
      res.json({ message: "Password updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to update password" });
    }
  };
  