"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function DiaryPage({ setCurrentPage }) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    setCurrentPage("apology")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-pink-300/20 rounded-lg p-8 max-w-md w-full shadow-2xl"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl text-pink-300 mb-8 leading-relaxed">Mere Pyare Kuchuu Puchuu 🥹💗</h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-6"
          >
            <img
              src="/gifs/sad-teddy.gif"
              alt="Sad teddy"
              className="w-32 h-32 mx-auto rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <p className="text-purple-200 text-lg mb-8 leading-relaxed">
              Hey Ishan, this little message is from Your . Our friendship matters to me, and I just want to make things right. Please read this with an open heart. 🫂
            </p>

            <motion.button
              onClick={handleContinue}
              className="px-6 py-3 bg-pink-500/20 border border-pink-300/30 rounded-full text-pink-200 hover:bg-pink-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              Continue reading...
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
