import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { serverUrl } from "../App";
import axios from 'axios';
import { burger,logo } from '../assets/assets';

import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Sparkles,
  UserRound,
  Eye,
  EyeOff,
} from 'lucide-react'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [role, setRole] = useState("")


  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { fullName, email, mobile, password } = formData;
      const result = await axios.post(`${serverUrl}/api/auth/signup`, { fullName, email, mobile, role, password }, { withCredentials: true })
      console.log(result)
    } catch (error) {
      console.log(error.message)

    }
  }


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
              className="mt-2 text-3xl font-bold leading-tight"
              style={{ color: colors.heading }}
            >
              Join thousands of food lovers
            </h1>

            <p className="mt-3 text-sm" style={{ color: colors.body }}>
              Order faster, save addresses, and get exclusive offers.
            </p>
          </div>
          <div className="flex items-center justify-center py-2  lg:w-[400px]">
            <img
              src={burger}
              alt="Burger illustration"
              className="w-[360px] sm:w-[200px] lg:w-[300px] object-contain rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>


          <div className="space-y-2">
            {[
              'Fast checkout & saved addresses',
              'Exclusive offers & rewards',
              'Secure payments',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={18} style={{ color: colors.primary }} />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="w-full lg:w-[55%] flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold" style={{ color: colors.heading }}>
              Create Account
            </h2>
            <p className="mt-1 text-sm" style={{ color: colors.muted }}>
              Sign up to get started
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">

              {/* Full Name */}
              <InputField
                icon={<UserRound size={18} />}
                id="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
              />

              {/* Email */}
              <InputField
                icon={<Mail size={18} />}
                id="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />

              {/* Mobile */}
              <InputField
                icon={<Phone size={18} />}
                id="mobile"
                type="tel"
                placeholder="Mobile number"
                value={formData.mobile}
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
                  className="absolute right-2 top-2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Role */}
              <div className="relative">
                <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
                  Select Role
                </label>

                <div className="flex gap-2">
                  {["user", "owner", "deliveryBoy"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() =>
                        setRole(r)

                      }
                      className={`flex-1 px-2 py-1 rounded-md border font-medium 
transition-all duration-200 cursor-pointer
        ${role === r
                          ? "bg-[#FF6B35] text-white border-[#FF6B35]"
                          : "border-gray-300 text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35] hover:bg-[#FFF2EB]"
                        }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-md py-1 text-white font-semibold transition hover:shadow-md hover:bg-gray-50 
active:scale-95 transition-all duration-200 ease-in-out  cursor-pointer"
                style={{ backgroundColor: colors.primary }}

              >
                Create Account
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Signup with google */}
            <button className="w-full mt-4 flex items-center justify-center gap-3 
bg-white border border-gray-300 rounded-lg px-2 py-1 
shadow-sm hover:shadow-md hover:bg-gray-50 
active:scale-95 transition-all duration-200 ease-in-out cursor-pointer">

              <FcGoogle size={22} />

              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            {/* Already have an account */}
            <p className="mt-2 text-sm text-center" style={{ color: colors.muted }}>
              Already have an account?{' '}
              <Link
                to="/signin"
                style={{ color: colors.primary }}
                className="font-semibold"
              >
                Sign in
              </Link>
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
    <div className="flex items-center gap-3 border rounded-md px-3 py-1 focus-within:ring-2 focus-within:ring-orange-200">
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

export default Signup