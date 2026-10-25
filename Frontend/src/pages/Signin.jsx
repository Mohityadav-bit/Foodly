import React, { useState } from 'react'
import { restaurent, logo } from '../assets/assets'
import { serverUrl } from '../App'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "../firebase.js";
import {
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
} from 'lucide-react'
import { useDispatch } from "react-redux";
import { setUserData } from '../reduxToolkit/userSlice.js'

const Signin = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Signing in...");
    try {
      const { email, password } = formData;
      const {data} = await axios.post(`${serverUrl}/api/auth/signin`, { email, password }, { withCredentials: true })
      toast.dismiss(loading);
      toast.success(`Welcome back, ${data.fullName || result.user.displayName}!`);
      // console.log(result)
      dispatch(setUserData(result.data))
      navigate('/')
    } catch (error) {
      toast.dismiss(loading); // ❗ always dismiss

      toast.error(
        error?.response?.data?.message);
      // console.log(error.message)

    }
  }

  // Google Authentication 
  const handleGoogleAuth = async () => {
    const loading = toast.loading("Signing in with Google...");

    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
        },
        { withCredentials: true }
      );

      toast.dismiss(loading);
      toast.success(`Welcome back, ${data.fullName || result.user.displayName}!`);
      dispatch(setUserData(data))
      navigate("/");
    } catch (error) {
      toast.dismiss(loading);

      toast.error(
        error.response?.data?.message ||
        "Unable to sign in with Google. Please try again."
      );

      console.error(error);
    }
  };

  const colors = {
    primary: '#FF6B35',
    primaryHover: '#F05A28',
    primaryLight: '#FFF2EB',
    background: '#FFF8F2',
    surface: '#FFFFFF',
    border: '#E5E7EB',
    heading: '#111827',
    body: '#374151',
    muted: '#6B7280',
  }

  return (
    <div
      className="h-screen w-full flex items-center justify-center px-4"
      style={{ backgroundColor: colors.background }}
    >
      <div className="w-full max-w-5xl h-[90vh] rounded-[28px] border bg-white shadow-xl flex overflow-hidden">

        {/* LEFT INFO PANEL */}
        <div
          className="hidden lg:flex lg:w-[45%] flex-col justify-between p-8"
          style={{ backgroundColor: colors.primaryLight }}
        >
          <div>
            <div
              className="h-10 w-30 object-contain cursor-pointer">
              <img src={logo} alt="logo" />
            </div>

            <h1
              className="mt-6 text-3xl font-bold leading-tight"
              style={{ color: colors.heading }}
            >
              Welcome back!
            </h1>

            <p className="mt-3 text-sm mb-2" style={{ color: colors.body }}>
              Sign in to continue ordering your favorite meals.
            </p>
          </div>


          <img
            src={restaurent}
            alt="restaurent illustration"
            className="w-[260px] sm:w-[300px] lg:w-[300px] object-contain rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300 border-28px"
          />


          <div className="space-y-3 text-sm mt-3">
            <p>🍔 Fast food delivery</p>
            <p>⚡ Quick checkout</p>
            <p>🎁 Exclusive offers</p>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="w-full lg:w-[55%] flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold" style={{ color: colors.heading }}>
              Sign In
            </h2>
            <p className="mt-1 text-sm" style={{ color: colors.muted }}>
              Welcome back! Please login to your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">

              {/* Email */}
              <InputField
                icon={<Mail size={18} />}
                id="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />

              {/* Password */}
              <div className="relative">
                <InputField
                  icon={<Lock size={18} />}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right text-sm">
                <a href="/forgot-password" className="text-orange-500 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-white font-semibold transition"
                style={{ backgroundColor: colors.primary }}>
                Sign In
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Signup with google */}
            <button className="w-full mt-4 flex items-center justify-center gap-3 
            bg-white border border-gray-300 rounded-lg px-2 py-1 
            shadow-sm hover:shadow-md hover:bg-gray-50 
            active:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
              onClick={handleGoogleAuth}>

              <FcGoogle size={22} />

              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            <p className="mt-4 text-sm text-center" style={{ color: colors.muted }}>
              Don’t have an account?{' '}
              <a href="/signup" style={{ color: colors.primary }} className="font-semibold">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Reusable Input Component */
const InputField = ({ icon, id, type = 'text', placeholder, value, onChange }) => {
  return (
    <div className="flex items-center gap-3 border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-orange-200">
      <span className="text-gray-400">{icon}</span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full outline-none bg-transparent text-sm"
        required
      />
    </div>
  )
}

export default Signin