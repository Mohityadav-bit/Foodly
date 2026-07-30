import React from "react";
import { motion } from "framer-motion";

const FoodlyLogoAnimated = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#FFF8F2]">
      <svg width="300" height="150" viewBox="0 0 300 150">

        {/* TEXT F */}
        <text x="10" y="80" fontSize="60" fill="#FF6B35" fontWeight="bold">
          F
        </text>

        {/* LEFT EYE */}
        <motion.circle
          cx="110"
          cy="65"
          r="18"
          fill="#FF6B35"
          animate={{ x: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* RIGHT EYE */}
        <motion.circle
          cx="150"
          cy="65"
          r="18"
          fill="#FF6B35"
          animate={{ x: [3, -3, 3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* INNER EYES */}
        <motion.circle
          cx="110"
          cy="65"
          r="8"
          fill="white"
          animate={{ x: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        <motion.circle
          cx="150"
          cy="65"
          r="8"
          fill="white"
          animate={{ x: [2, -2, 2] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* SMILE */}
        <motion.path
          d="M95 105 Q130 125 165 105"
          stroke="#FF6B35"
          strokeWidth="5"
          fill="transparent"
          animate={{ x: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* TONGUE */}
        <motion.ellipse
          cx="135"
          cy="115"
          rx="8"
          ry="5"
          fill="red"
          animate={{ opacity: [0, 1, 0], y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* TEXT dly */}
        <text x="170" y="80" fontSize="60" fill="#FF6B35" fontWeight="bold">
          dly
        </text>

      </svg>
    </div>
  );
};

export default FoodlyLogoAnimated;