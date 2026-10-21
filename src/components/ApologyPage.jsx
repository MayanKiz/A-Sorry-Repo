"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function ApologyPage({ setCurrentPage }) {
  const [currentText, setCurrentText] = useState(0)

  const texts = ["I am genuinely sorry, Ishan, agar maine tujhe personally hurt kiya ho...", "Mera aisa koi intention nahi tha ki main tujhe hurt karun ya tera bharosa todun...", "Even if it was a joke, I understand it may have hurt you. I am really sorry, bhai. 🤍"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleContinue = () => {
    setCurrentPage("letter")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <img
          src="/gifs/notice-me.gif"
          alt="Teddy trying to convincing"
          className="w-56 mx-auto rounded-lg"
        />
      </motion.div>

      <motion.div
        className="space-y-6 max-w-lg min-h-[80px] flex items-center justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.p
          key={currentText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-2xl text-pink-200 leading-relaxed"
        >
          {texts[currentText]}
        </motion.p>
      </motion.div>

      <motion.button
        onClick={handleContinue}
        className="mt-10 px-8 py-4 bg-purple-500/20 border border-purple-300/30 rounded-full text-purple-200 text-lg hover:bg-purple-500/30 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Next...
      </motion.button>
    </div>
  )
}
