import React, { useState } from "react"; // ✅ added useState
import { useNavigate } from "react-router-dom";
import { logo, img1 } from "../assets/assets";
import toast from "react-hot-toast";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import {serverUrl} from '../App';
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // ✅ STEP CONTROL
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ STATES
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const colors = {
    primary: "#FF6B35",
    primaryHover: "#F05A28",
    primaryLight: "#FFF2EB",
    background: "#FFF8F2",
    surface: "#FFFFFF",
    border: "#E5E7EB",
    heading: "#111827",
    body: "#374151",
    muted: "#6B7280",
  };

  // ================= STEP 1 =================
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const loading = toast.loading("Sending OTP...");

    try {
      
      // 👉 API call here
      const result = await axios.post(`${serverUrl}/api/auth/send-otp`,{email},{withCredentials:true})
      console.log(result);

      toast.dismiss(loading);
      toast.success("OTP sent to your email");

      setStep(2); // move to OTP
    } catch (err) {
      console.log("FULL ERROR:", err); 
      toast.dismiss(loading);
      toast.error("Failed to send OTP");
    }
  };


  // ================= STEP 2 =================
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const loading = toast.loading("Verifying OTP...");

    try {
      const result = await axios.post(`${serverUrl}/api/auth/Verify-otp`,{email,otp},{withCredentials:true})
      console.log(result);

      toast.dismiss(loading);
      toast.success("OTP verified");

      setStep(3); // move to reset password
    } catch (err) {
      toast.dismiss(loading);
      toast.error("Invalid OTP");
    }
  };


  // ================= STEP 3 =================
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    console.log("Clicked");

    // ✅ password match check
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match"); //
      return;
    }

    const loading = toast.loading("Updating password...");
    if(newPassword!=confirmPassword){
      return null
    }
    try {
      const result = await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},{withCredentials:true})
      console.log(result);

      // 👉 API call here

      toast.dismiss(loading);
      toast.success("Password reset successful");

      navigate("/signin");
    } catch (err) {
      toast.dismiss(loading);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center px-4"
      style={{ backgroundColor: colors.background }}
    >
      <div className="w-full max-w-5xl h-[90vh] rounded-[28px] border bg-white shadow-xl flex overflow-hidden">

        {/* ================= LEFT SIDE (UNCHANGED) ================= */}
        <div
          className="hidden lg:flex lg:w-[45%] flex-col justify-between p-8"
          style={{ backgroundColor: colors.primaryLight }}
        >
          <div>
            <div className="h-10 w-30 object-contain cursor-pointer mb-2">
              <img src={logo} alt="logo" />
            </div>

            <h1
              className="mt-4 text-3xl font-bold leading-tight"
              style={{ color: colors.heading }}
            >
              Forgot Password?
            </h1>

            <p className="text-[#374151] mb-3">
              No worries! Enter your email and we’ll send you a reset link.
            </p>

            <img
              src={img1}
              alt="food"
              className="w-[260px] sm:w-[300px] lg:w-[300px] object-contain rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300 border-28px"
            />

            <ul className="mt-2 space-y-2 text-[#374151]">
              <li>🔐 Secure reset process</li>
              <li>⚡ Quick email delivery</li>
            </ul>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white">

          {/* ===== STEP 1: EMAIL ===== */}
          {step === 1 && (
            <>
              <h2 className="text-3xl font-semibold mb-2 text-[#111827]">
                Reset Password
              </h2>

              <p className="text-[#6B7280] mb-6">
                Enter your email to receive reset instructions
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // ✅ controlled input
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#FF6B35]"
                />

                <button
                  type="submit"
                  className="w-full bg-[#FF6B35] text-white py-3 rounded-lg hover:bg-[#F05A28]"
                  onClick={handleEmailSubmit}
                >
                  Send OTP →
                </button>
              </form>
            </>
          )}

          {/* ===== STEP 2: OTP ===== */}
          {step === 2 && (
            <>
              <h2 className="text-3xl font-semibold mb-2 text-[#111827]">
                Verify OTP
              </h2>

              <p className="text-[#6B7280] mb-6">
                Enter OTP sent to {email}
              </p>

              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#FF6B35]"
                />

                <button
                  type="submit"
                  className="w-full bg-[#FF6B35] text-white py-3 rounded-lg hover:bg-[#F05A28]"
                  onClick={handleOtpSubmit}
                >
                  Verify OTP →
                </button>
              </form>
            </>
          )}

        
          {/* ===== STEP 3: RESET PASSWORD ===== */}
          {step === 3 && (
            <>
              <h2 className="text-3xl font-semibold mb-2 text-[#111827]">
                Create New Password
              </h2>

              <p className="text-[#6B7280] mb-6">
                Enter new password below
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">

                {/* NEW PASSWORD */}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#FF6B35]"
                />

                {/* CONFIRM PASSWORD */}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#FF6B35]"
                />

                {/* ✅ CHECKBOX */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                  <label htmlFor="showPassword" className="text-sm text-gray-600 cursor-pointer">
                    Show Password
                  </label>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full bg-[#FF6B35] text-white py-3 rounded-lg hover:bg-[#F05A28]"
                >
                  Reset Password →
                </button>
              </form>
            </>
          )}

          {/* COMMON FOOTER */}
          {/* <p className="mt-4 text-sm text-[#374151]">
            Remember your password?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="text-[#FF6B35] cursor-pointer hover:underline"
            >
              Back to Login
            </span>
          </p> */}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;