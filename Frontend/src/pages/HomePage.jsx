import React from 'react'
import { Link } from "react-router-dom";
import { logo } from '../assets/assets';
import {
  Search,
  MapPin,
  Star,
  Clock,
  ShoppingCart,
  Sparkles,
} from 'lucide-react'

const HomePage = () => {
  // const navigate = useNavigate()
  const categories = [
    { name: 'Pizza', img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092' },
    { name: 'Burger', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349' },
    { name: 'Biryani', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d' },
    { name: 'Desserts', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b' },
    { name: 'Chinese', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246' },
  ]

  const restaurants = [
    {
      name: 'Spice Kitchen',
      rating: 4.5,
      time: '30-40 min',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      tag: '50% OFF',
    },
    {
      name: 'Burger Hub',
      rating: 4.2,
      time: '20-30 min',
      img: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
      tag: 'Free Delivery',
    },
    {
      name: 'Biryani House',
      rating: 4.7,
      time: '35-45 min',
      img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d',
      tag: 'Trending',
    },
  ]
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
    <div className="bg-[#FFF8F2] min-h-screen">

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 bg-white shadow-sm px-6 py-3 flex items-center justify-between">
        <div
          className="h-8 w-30 object-contain cursor-pointer">
          <img src={logo} alt="logo" />
        </div>

        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full w-[400px]">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for restaurants or food..."
            className="bg-transparent outline-none ml-2 w-full text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/signin"
            className="text-sm pointer"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm pointer"
          >
            Sign Up
          </Link>
          <ShoppingCart />
        </div>
      </div>

      {/* HERO */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-400 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Hungry? We’ve got you covered 🍔
            </h2>
            <p className="mt-2 text-sm">
              Order from your favorite restaurants near you
            </p>

            <button className="mt-4 bg-white text-orange-500 px-5 py-2 rounded-full text-sm font-semibold">
              Explore Now
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            className="w-40 mt-4 md:mt-0 rounded-xl"
          />
        </div>
      </div>

      {/* CATEGORY SCROLL */}
      <div className="mt-8 px-6">
        <h3 className="font-semibold text-lg mb-4">What's on your mind?</h3>

        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="min-w-[100px] text-center cursor-pointer group"
            >
              <img
                src={cat.img}
                className="w-20 h-20 rounded-full object-cover mx-auto group-hover:scale-110 transition"
              />
              <p className="text-sm mt-2">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* OFFERS */}
      <div className="mt-8 px-6">
        <h3 className="font-semibold text-lg mb-4">Best Offers</h3>

        <div className="flex gap-4 overflow-x-auto">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="min-w-[250px] bg-orange-500 text-white rounded-xl p-4 shadow-md"
            >
              <h4 className="font-bold text-lg">Flat 50% OFF</h4>
              <p className="text-sm mt-1">On selected restaurants</p>
            </div>
          ))}
        </div>
      </div>

      {/* RESTAURANTS */}
      <div className="mt-10 px-6">
        <h3 className="font-semibold text-lg mb-4">Top Restaurants Near You</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {restaurants.map((res, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={res.img}
                  className="w-full h-40 object-cover group-hover:scale-105 transition"
                />

                <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                  {res.tag}
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-semibold">{res.name}</h4>

                <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-green-500" />
                    {res.rating}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {res.time}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  North Indian • Fast Food • Chinese
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-16 bg-white py-6 text-center text-sm text-gray-500">
        © 2026 Foodly • Built with ❤️
      </div>
    </div>
  )
}

export default HomePage