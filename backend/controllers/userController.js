import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
export const loginUser = async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    
    const user = await userModel.findOne({ email, phone }); // Added phone to find user
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    
    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email"
      });
    }
    
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password"
      });
    }
    
    // Additional phone validation
    if (!phone || phone.length < 10) {
      return res.json({
        success: false,
        message: "Please enter a valid phone number"
      });
    }
    
    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new userModel({ 
      name, 
      email, 
      password: hashedPassword,
      phone 
    });
    
    const user = await newUser.save();
    const token = createToken(user._id);
    
    res.json({ success: true, token });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

//Route for Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};


export const userProfile = async (req, res) => {
  try {
      const token = req.headers.token; // Assuming the token is in the 'token' header

      if (!token) {
          return res.status(401).json({ success: false, message: "Authentication token missing" });
      }

      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
          if (err) {
              return res.status(401).json({ success: false, message: "Invalid token" });
          }

          const userId = decoded.id; // Extract user ID from the decoded token

          const user = await userModel.findById(userId).select("-password"); // Exclude password from the response
          console.log(user);

          if (!user) {
              return res.status(404).json({ success: false, message: "User not found" });
          }

          res.status(200).json({ success: true, user });
      });
  } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
try {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication token missing" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    const userId = decoded.id;
    const { name, email, password } = req.body;

    const user = await userModel.findById(userId);

    if(!user){
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if(name){
      user.name = name;
    }
    if(email){
      user.email = email;
    }

    if(password){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({ success: true, user: updatedUser });

  });
} catch (error) {
  console.error("Error updating user profile:", error);
  res.status(500).json({ success: false, message: "Internal server error" });
}
}

export const fetchUsers = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }

      const users = await userModel.find().select("-password").sort({ date: -1 });;
      console.log(users)
      res.status(200).json({ success: true, users });
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const deleteUsers = async (req, res) => {
  try {
    const token = req.headers.token;
    const userId = req.params.userId; // Assuming the user ID is in the URL params

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token missing" });
    }

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }

      // Check if the user exists
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      await userModel.findByIdAndDelete(userId); // Delete the user

      res.status(200).json({ success: true, message: "User deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
