"use client"

import { motion } from "framer-motion"

export default function OpeningPage({ setCurrentPage, setMusicPlaying, setShowMusicPlayer }) {

  const handleLetMeTalk = () => {
    setMusicPlaying(true)
    setShowMusicPlayer(true)
    setTimeout(() => {
      setCurrentPage("diary")
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative">
      {/* Floating cute elements */}
      <motion.div
        className="absolute top-20 left-10 text-2xl"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        🌙
      </motion.div>

      <motion.div
        className="absolute top-10 md:top-32 right-8 md:right-16 text-xl"
        animate={{
          y: [0, -8, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 1,
        }}
      >
        ✨
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-8 relative"
      >
        {/* Cute glow effect around teddy */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-xl scale-110"></div>
        <img
          src="/gifs/teddy-walking.gif"
          className="w-64 h-64 mx-auto rounded-2xl relative z-10"
          alt="Walking Teddy"
        />

        {/* Floating hearts around teddy */}
        <motion.div
          className="absolute -top-2 -right-2 text-lg"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          💕
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="space-y-6 max-w-md"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-pink-200 text-xl leading-relaxed"
        >
          It's late night<br></br>
          I've been walking for hours<br></br>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-purple-200 text-xl leading-relaxed"
        >
          Dimag meh bahut kuch chal Rha <br></br>Ham Soch rhe<br></br>
        </motion.p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={handleLetMeTalk}
        className="mt-12 px-10 py-4 bg-gradient-to-r from-pink-500/30 to-purple-500/30 backdrop-blur-sm border border-pink-300/40 rounded-full text-pink-100 text-xl hover:from-pink-500/40 hover:to-purple-500/40 transition-all duration-500 shadow-xl shadow-pink-500/30 relative overflow-hidden"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 0 35px rgba(236, 72, 153, 0.4)",
          y: -2,
        }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Cute sparkle effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
          }}
        />
        <span className="relative z-10">Let me proceed...</span>
      </motion.button>

      {/* Bottom floating elements */}
      <motion.div
        className="absolute bottom-20 left-8 text-xl"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          delay: 2,
        }}
      >
        🌸
      </motion.div>
    </div>
  )
}
