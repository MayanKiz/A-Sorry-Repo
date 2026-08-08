"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Heart } from "lucide-react"

export default function HugPage({ setCurrentPage }) {
  const [hearts, setHearts] = useState([])
  const [showHearts, setShowHearts] = useState(false)

  const sendHug = () => {

    setShowHearts(true)
    const newHearts = []
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 800
    const screenHeight = typeof window !== "undefined" ? window.innerHeight : 600

    for (let i = 0; i < 25; i++) {
      const x = Math.random() * screenWidth;
      newHearts.push({
        id: i,
        x: x,
        y: screenHeight - (Math.random() * 30),
        delay: Math.random() * 2.5,
        size: 10 + Math.random() * 16,
        color: ["text-pink-400", "text-red-400", "text-purple-400", "text-rose-400", "text-fuchsia-400"][
          Math.floor(Math.random() * 5)
        ],
        drift: (Math.random() - 0.5) * 120,
        rotation: Math.random() * 360,
      })
    }
    setHearts(newHearts)

    setTimeout(() => {
      setCurrentPage("gift")
    }, 4500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Floating cute elements */}
      <motion.div
        className="absolute top-16 right-12 text-2xl"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
          
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-8 relative"
      >
        {/* Cute aura around teddy */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/25 to-red-400/25 rounded-full blur-2xl scale-110"></div>
        <img
          src="/gifs/teddy-hug.gif"
          alt="Teddy with open arms"
          className=" mx-auto rounded-2xl relative z-10"
        />

        {/* Floating love elements */}
        <motion.div
          className="absolute -top-10 -left-10 text-xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="space-y-6 max-w-md"
      >
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-2xl text-pink-200 leading-relaxed"
        >
          I don’t need anything fancy right now…
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-xl text-purple-200 leading-relaxed"
        >
          Just you around me,as a friend...... that’s all I want...
        </motion.p>
      </motion.div>

      <motion.button
        onClick={sendHug}
        className="mt-12 px-10 py-4 bg-gradient-to-r from-pink-500/30 to-red-500/30 backdrop-blur-sm border border-pink-300/40 rounded-full text-pink-200 text-xl hover:from-pink-500/40 hover:to-red-500/40 transition-all duration-500 shadow-xl shadow-pink-500/30 flex gap-4 relative overflow-hidden"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 35px rgba(236, 72, 153, 0.4)",
          y: -2,
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        disabled={showHearts}
      >
        {/* Sparkle effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 4,
          }}
        />
        <Heart size={24} className="text-pink-200 relative z-10" />
        <span className="relative z-10">One Last Thing</span>
      </motion.button>

      <AnimatePresence>
        <div className="fixed inset-0 z-40 pointer-events-none w-full h-full">
          {showHearts &&
            hearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{
                  x: heart.x,
                  y: heart.y,
                  opacity: 0,
                  scale: 0,
                  rotate: heart.rotation,
                }}
                animate={{
                  y: -200,
                  x: heart.x,
                  opacity: [0, 1, 1, 0.8, 0],
                  scale: [0, 1.4, 1.2, 0.9, 0.4],
                  rotate: heart.rotation + 720,
                }}
                transition={{
                  duration: 4,
                  delay: heart.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute pointer-events-none"
              >
                <Heart
                  className={`${heart.color} fill-current drop-shadow-lg`}
                  size={heart.size}
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.6))",
                  }}
                />
              </motion.div>
            ))}
        </div>
      </AnimatePresence>
    </div>
  )
}
