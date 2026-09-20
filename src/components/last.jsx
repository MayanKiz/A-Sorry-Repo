"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { MessageCircle, Heart } from "lucide-react"

// Added setMusicPlaying as a prop
export default function LastPage({ setMusicPlaying }) {
  const audioRefs = useRef([])

  // Hardcoded array with duplicates removed (based on matching file sizes)
  const voiceNotes = [
    
      10010
  ]

  const handlePlay = (currentIndex) => {
    // 1. Turn off global background music
    if (setMusicPlaying) {
      setMusicPlaying(false)
    }

    // 2. Pause any other playing voice note when a new one starts
    audioRefs.current.forEach((audio, index) => {
      if (audio && index !== currentIndex && !audio.paused) {
        audio.pause()
      }
    })
  }

  const handleWhatsApp = () => {
    const predefinedMessage = "Hey Mayank....."
    const encodedMessage = encodeURIComponent(predefinedMessage)
    window.open(`https://wa.me/919451755012?text=${encodedMessage}`, "_blank")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 pb-10 px-4 text-center relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        className="fixed top-20 left-6 text-2xl opacity-50 pointer-events-none"
        animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      >
        🥺
      </motion.div>
      <motion.div
        className="fixed top-40 right-6 text-xl opacity-50 pointer-events-none"
        animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      >
        🩹
      </motion.div>

      {/* Main Glassmorphic Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md bg-gradient-to-b from-cyan-200/20 to-blue-300/20 backdrop-blur-xl border border-cyan-100/20 rounded-[2.5rem] p-6 shadow-2xl flex flex-col h-[70vh]"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-3xl text-cyan-100 font-semibold mb-2 drop-shadow-md"
        >
          Listen to me... 🎧
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-cyan-50/80 mb-6 text-sm"
        >
          I left a few things I needed to say... Take your time with them.
        </motion.p>

        {/* Scrollable Audio List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar"
          style={{
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}
        >
          {voiceNotes.map((num, index) => (
            <motion.div
              key={num}
              variants={itemVariants}
              className="relative bg-[#FFF4EB] rounded-2xl p-4 pt-10 shadow-sm border border-orange-100/50"
            >
              {/* Heart Icon top right */}
              <Heart 
                className="absolute top-3 right-4 text-pink-400 fill-pink-400 drop-shadow-sm"           size={22} 
              />

              {/* Native Browser Audio Controls */}
              <audio
                controls
                controlsList="nodownload noplaybackrate"
                className="w-full h-10 outline-none"
                ref={(el) => (audioRefs.current[index] = el)}
                src={`/audio/${num}.mp3`}
                onPlay={() => handlePlay(index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer Area with Sorry & WhatsApp */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="flex flex-col items-center mt-6 z-10"
      >
        <motion.p 
          className="text-pink-300/70 text-lg mb-4 italic"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >A story written for you</motion.p>

        <motion.button
          onClick={handleWhatsApp}
          className="px-8 py-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-400/40 rounded-full text-green-100 text-lg hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-500 shadow-xl shadow-green-500/20 flex items-center gap-3 relative overflow-hidden group"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 35px rgba(34, 197, 94, 0.4)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
          />
          <MessageCircle size={22} className="text-green-300 relative z-10 group-hover:animate-pulse" />
          <span className="relative z-10 font-medium">Text me when you're ready</span>
          <Heart size={16} className="text-green-300 relative z-10 ml-1" />
        </motion.button>
      </motion.div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  )
}
