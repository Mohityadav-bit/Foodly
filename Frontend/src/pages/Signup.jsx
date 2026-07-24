import React from 'react'
import { ArrowRight, CheckCircle2, Lock, Mail, Phone, Sparkles, UserRound, Eye, EyeOff } from 'lucide-react'


const Signup = () => {
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
      className="min-h-screen w-full flex items-center justify-center px-4 py-5"
      style={{ backgroundColor: colors.background }}
    >

      {/* Right Part */}
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white shadow-[0_25px_80px_rgba(17,24,39,0.08)]">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[45%] p-8 lg:p-10" style={{ backgroundColor: colors.primaryLight }}>
            <div className="flex items-center gap-2 text-[20px] font-semibold" style={{ color: colors.primary }}>
              <Sparkles size={20} />
              <span>Foodly</span>
            </div>

            <h1 className="mt-6 text-3xl font-bold leading-tight" style={{ color: colors.heading }}>
              Join thousands of food lovers
            </h1>
            <p className="mt-3 text-base leading-7" style={{ color: colors.body }}>
              Create your account to order your favourite meals, save your addresses, and enjoy exclusive deals.
            </p>

            <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} style={{ color: colors.primary }} />
                <p className="text-sm font-medium" style={{ color: colors.heading }}>
                  Fast checkout and saved addresses
                </p>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <CheckCircle2 size={18} style={{ color: colors.primary }} />
                <p className="text-sm font-medium" style={{ color: colors.heading }}>
                  Fresh offers and loyalty rewards
                </p>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <CheckCircle2 size={18} style={{ color: colors.primary }} />
                <p className="text-sm font-medium" style={{ color: colors.heading }}>
                  Secure payments and quick support
                </p>
              </div>
            </div>
          </div>
          {/* Left part */}
          <div className="w-full lg:w-[55%] p-8 lg:p-10">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold" style={{ color: colors.heading }}>
                Create Account
              </h2>
              <p className="mt-2 text-sm" style={{ color: colors.muted }}>
                Sign up to get started with delicious deliveries.
              </p>
            </div>

            <form className="space-y-4">

              {/* fullName */}
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium" style={{ color: colors.heading }}>
                  Full Name
                </label>
                <div className="flex items-center gap-3 rounded-xl border px-4 py-3 transition focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FFF2EB]" style={{ borderColor: colors.border }}>
                  <UserRound size={18} style={{ color: colors.muted }} />
                  <input
                    id="fullName"
                    type="text"
                    className="w-full border-none bg-transparent outline-none placeholder:text-[#9CA3AF]"
                    placeholder="Enter your full name"
                   />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium" style={{ color: colors.heading }}>
                  Email
                </label>
                <div className="flex items-center gap-3 rounded-xl border px-4 py-3 transition focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FFF2EB]" style={{ borderColor: colors.border }}>
                  <Mail size={18} style={{ color: colors.muted }} />
                  <input
                    id="email"
                    type="email"
                    className="w-full border-none bg-transparent outline-none placeholder:text-[#9CA3AF]"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* mobile */}
              <div>
                <label htmlFor="mobile" className="mb-2 block text-sm font-medium" style={{ color: colors.heading }}>
                  Mobile
                </label>
                <div className="flex items-center gap-3 rounded-xl border px-4 py-3 transition focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FFF2EB]" style={{ borderColor: colors.border }}>
                  <Phone size={18} style={{ color: colors.muted }} />
                  <input
                    id="mobile"
                    type="tel"
                    className="w-full border-none bg-transparent outline-none placeholder:text-[#9CA3AF]"
                    placeholder="Enter your mobile no."
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium" style={{ color: colors.heading }}>
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-xl border px-4 py-3 transition focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FFF2EB]" style={{ borderColor: colors.border }}>
                  <Lock size={18} style={{ color: colors.muted }} />
                  <input
                    id="password"
                    type="password"
                    className="w-full border-none bg-transparent outline-none placeholder:text-[#9CA3AF]"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="button"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white transition hover:opacity-95"
                style={{ backgroundColor: colors.primary }}
              >
                Create Account
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-5 text-center text-sm" style={{ color: colors.muted }}>
              Already have an account?{' '}
              <a href="/signin" className="font-semibold" style={{ color: colors.primary }}>
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup