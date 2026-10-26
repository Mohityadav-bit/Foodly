import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

// SignUp
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already exist" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }
    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "mobile no must be at least 10 digits" });
    }
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      role,
      mobile,
      password: hashedPassword,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const safeUser = await User.findById(user._id).select(
      "-password -resetOtp -isOtpVerified -otpExpires",
    );
    return res.status(201).json(safeUser);
  } catch (error) {
    console.log("SIGNUP ERROR:", error); // 👈 ADD THIS
    return res.status(500).json({ message: error.message });
  }
};

// SignIn
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const safeUser = await User.findById(user._id).select(
      "-password -resetOtp -isOtpVerified -otpExpires",
    );
    return res.status(200).json(safeUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// SignOut
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "log out successfully" });
  } catch (error) {
    console.log("SIGNUP ERROR:", error); // 👈 ADD THIS
    return res.status(500).json({ message: error.message });
  }
};

// Send otp

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendOtpMail(email, otp);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json(`send OTP error ${error}`);
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "invalid/expired otp" });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "OTP verify successfully" });
  } catch (error) {
    return res.status(500).json(`Verify OTP error ${error}`);
  }
};

// Reset Password

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    console.log("Incoming:", req.body);

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user || !user.isOtpVerified) {
      // ✅ FIXED
      return res.status(400).json({ message: "User does not exist." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.isOtpVerified = false; // ✅ FIXED

    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(`Reset password error ${error}`);
  }
};

// Google Authentication

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobile,
        role,
      });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const safeUser = await User.findById(user._id).select(
      "-password -resetOtp -isOtpVerified -otpExpires",
    );

    return res.status(200).json(safeUser);
  } catch (error) {
    return res.status(500).json(`googleAuth error ${error}`);
  }
};
