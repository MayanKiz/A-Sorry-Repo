"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Heart } from "lucide-react"

export default function HugPage({ setCurrentPage }) {
  const [hearts, setHearts] = useState([])
  const [showHearts, setShowHearts] = useState(false)
  const [showForgiveness, setShowForgiveness] = useState(false)
  const [showFriendQuestion, setShowFriendQuestion] = useState(false)

  // Send answer to Telegram (Silently in background)
  const sendAnswer = (answer) => {
    fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    }).catch(() => {})
  }

  // Step 1: When she clicks Yes for Forgiveness
  const handleForgiveYes = () => {
    sendAnswer("Forgiveness answer: Yes")
    setShowFriendQuestion(true) // Moves to Step 2
  }

  // Step 2: When she clicks Yes for Friendship
  const handleFriendYes = () => {
    sendAnswer("Friend question answer: Yes")
    setShowHearts(true)
    
    // Generate flying hearts
    const newHearts = []
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 800
    const screenHeight = typeof window !== "undefined" ? window.innerHeight : 600

    for (let i = 0; i < 25; i++) {
      const x = Math.random() * screenWidth
      newHearts.push({
        id: i,
        x,
        y: screenHeight - Math.random() * 30,
        delay: Math.random() * 2.5,
        size: 10 + Math.random() * 16,
        color: ["text-pink-400", "text-red-400", "text-purple-400", "text-rose-400", "text-fuchsia-400"][
          Math.floor(Math.random() * 5)
        ],
        rotation: Math.random() * 360,
      })
    }
    setHearts(newHearts)

    // Move to next page after animation
    setTimeout(() => {
      setCurrentPage("gift")
    }, 4500)
  }

  // Handles "No" clicks for both steps
  const handleNoClick = () => {
    const answer = showFriendQuestion ? "No (Friendship)" : "No (Forgiveness)"
    sendAnswer(`Answer: ${answer}`)
    setShowForgiveness(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden pb-10">
      
      {/* Cute GIF Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-8 relative mt-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/25 to-red-400/25 rounded-full blur-2xl scale-110"></div>
        <img
          src="/gifs/rabbits.gif"
          alt="Emotional cute animals"
          className="mx-auto rounded-2xl relative z-10 w-64 md:w-72"
        />
      </motion.div>

      {/* Logical Text Section - Changes smoothly based on Step */}
      <div className="h-32 flex items-center justify-center max-w-md">
        <AnimatePresence mode="wait">
          {!showFriendQuestion ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <p className="text-xl text-purple-200 leading-relaxed">
                I don’t need anything fancy right now…
              </p>
              <p className="text-2xl text-pink-200 leading-relaxed font-medium">
                Can you please forgive me? 🥺💗
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <p className="text-xl text-purple-200 leading-relaxed">
                Thank you for forgiving me... 🥺💗
              </p>
              <p className="text-2xl text-pink-200 leading-relaxed font-medium">
                I need you as a friend... will you stay? 🤍
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col items-center mt-6">
        <motion.button
          onClick={() => (showFriendQuestion ? handleFriendYes() : handleForgiveYes())}
          className="px-10 py-4 bg-gradient-to-r from-pink-500/30 to-red-500/30 backdrop-blur-sm border border-pink-300/40 rounded-full text-pink-200 text-xl hover:from-pink-500/40 hover:to-red-500/40 transition-all duration-500 shadow-xl shadow-pink-500/30 flex gap-4 relative overflow-hidden"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 35px rgba(236, 72, 153, 0.4)",
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
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
          <span className="relative z-10">Yes</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={handleNoClick}
          disabled={showHearts}
          className="mt-4 px-10 py-3 bg-white/5 backdrop-blur-sm border border-purple-300/30 rounded-full text-purple-200 text-lg hover:bg-purple-500/20 transition-all duration-300 disabled:opacity-50"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          No 🙈
        </motion.button>
      </div>

      {/* "No" Modal Pop-up */}
      <AnimatePresence>
        {showForgiveness && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 px-5 backdrop-blur-sm"
          >
            <div className="w-full max-w-md rounded-3xl border border-pink-300/30 bg-gray-900/95 px-6 py-8 shadow-2xl shadow-pink-500/20 relative">
              <img
                src="/gifs/rabbits.gif"
                alt="Sad cute animal"
                className="mx-auto mb-5 w-40 rounded-2xl"
              />
              <p className="text-2xl leading-relaxed text-pink-200 font-medium">
                {showFriendQuestion ? "I still need you as my friend... 🥺💔" : "I hope you forgive me... 🥺💔"}
              </p>
              <p className="mt-3 text-lg text-purple-200">
                {showFriendQuestion ? "Please don't leave me alone 🙏" : "Please give me one chance 🙏"}
              </p>
              <motion.button
                type="button"
                onClick={() => setShowForgiveness(false)}
                className="mt-7 rounded-full border border-pink-300/40 bg-pink-500/20 px-8 py-3 text-lg text-pink-100 transition hover:bg-pink-500/35"
                whileTap={{ scale: 0.96 }}
              >
                Let me think again 💗
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flying Hearts Animation when she finally says Yes to Friendship */}
      <AnimatePresence>
        <div className="fixed inset-0 z-40 pointer-events-none w-full h-full overflow-hidden">
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
