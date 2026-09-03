"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Heart, Play, Pause } from "lucide-react"

export default function HugPage({ setCurrentPage }) {
  const [hearts, setHearts] = useState([])
  const [confetti, setConfetti] = useState([])
  const [showHearts, setShowHearts] = useState(false)
  const [showForgiveness, setShowForgiveness] = useState(false)
  const [showFriendQuestion, setShowFriendQuestion] = useState(false)
  
  // Audio Player States
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // Cleanup audio when component unmounts or modal closes
  useEffect(() => {
    if (!showForgiveness && isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
    return () => {
      audioRef.current?.pause()
    }
  }, [showForgiveness, isPlaying])

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Send answer to Telegram
  const sendAnswer = (answer) => {
    fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    }).catch(() => {})
  }

  // Custom Confetti Generator
  const triggerConfetti = (type) => {
    const newConfetti = []
    const colors = ['bg-pink-400', 'bg-purple-400', 'bg-white', 'bg-red-400', 'bg-rose-300']
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 400

    if (type === 'small') {
      for (let i = 0; i < 40; i++) {
        newConfetti.push({
          id: `small-${Date.now()}-${i}`,
          originX: 0,
          originY: 0,
          targetX: (Math.random() - 0.5) * 300,
          targetY: Math.random() * 300 + 100,
          rotation: Math.random() * 720,
          scale: Math.random() * 0.6 + 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm',
          duration: 2 + Math.random(),
          delay: Math.random() * 0.2
        })
      }
    } else {
      for (let i = 0; i < 80; i++) {
        const isLeft = i % 2 === 0
        newConfetti.push({
          id: `massive-${Date.now()}-${i}`,
          originX: isLeft ? -(screenW / 2) + 50 : (screenW / 2) - 50,
          originY: 200,
          targetX: isLeft ? Math.random() * 300 : -(Math.random() * 300),
          targetY: Math.random() * 500 + 200,
          rotation: Math.random() * 720,
          scale: Math.random() * 0.8 + 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm',
          duration: 3 + Math.random() * 2,
          delay: Math.random() * 1.5
        })
      }
    }
    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), type === 'small' ? 3000 : 5000)
  }

  const handleForgiveYes = () => {
    sendAnswer("Forgiveness answer: Okay Done")
    triggerConfetti('small')
    setShowFriendQuestion(true)
  }

  const handleFriendYes = () => {
    sendAnswer("Friend question answer: okay)
    setShowHearts(true)
    triggerConfetti('massive')

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

    setTimeout(() => {
      setCurrentPage("gift")
    }, 4500)
  }

  const handleNoClick = () => {
    const answer = showFriendQuestion ? "No (Friendship)" : "No (Forgiveness)"
    sendAnswer(`Answer: ${answer}`)
    setShowForgiveness(true)

    // YAHAN HAI MAGIC: Stop all bg music & Autoplay Voice Note
    if (showFriendQuestion) {
      // 1. Find all audio elements on the website and pause them
      document.querySelectorAll('audio').forEach(audio => {
        if (audio !== audioRef.current) {
          audio.pause();
        }
      });

      // 2. Play the funny voice note immediately
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Start from beginning
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => console.log("Autoplay blocked by browser", err));
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden pb-10">
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src="/audio/10005.mp3" 
        onEnded={() => setIsPlaying(false)}
      />

      {/* Confetti Engine */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
        <AnimatePresence>
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ x: c.originX, y: c.originY, scale: 0, opacity: 1 }}
              animate={{
                x: c.originX + c.targetX,
                y: [c.originY, c.originY - c.targetY, c.originY + 800],
                rotate: c.rotation,
                scale: c.scale,
                opacity: [0, 1, 1, 0]
              }}
              transition={{ duration: c.duration, delay: c.delay, ease: "easeInOut" }}
              className={`absolute w-3 h-3 ${c.color} ${c.shape} shadow-sm`}
            />
          ))}
        </AnimatePresence>
      </div>

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

      <div className="flex flex-col items-center mt-6 z-20 relative">
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
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
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
                src="/gifs/snnana.gif"
                alt="Sad cute animal"
                className="mx-auto mb-5 w-40 rounded-2xl"
              />
              <p className="text-2xl leading-relaxed text-pink-200 font-medium">
                {showFriendQuestion ? "Arreyy..!? 🥺" : "I hope you forgive me... 🥺💔"}
              </p>
              
              {/* NEW AUDIO PLAYER WITH AUTOPLAY LOGIC */}
              {showFriendQuestion ? (
                <div className="my-6 p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex flex-col items-center justify-center gap-3">
                  <p className="text-sm text-pink-300 font-medium tracking-wide">😶</p>
                  <motion.button 
                    onClick={toggleAudio}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                  >
                    {isPlaying ? (
                      <Pause size={24} className="text-white fill-current" />
                    ) : (
                      <Play size={24} className="text-white fill-current ml-1" />
                    )}
                  </motion.button>
                </div>
              ) : (
                <p className="mt-3 mb-6 text-lg text-purple-200">Please give me one chance 🙏</p>
              )}

              <motion.button
                type="button"
                onClick={() => setShowForgiveness(false)}
                className="mt-4 w-full rounded-full border border-pink-300/40 bg-pink-500/20 px-8 py-3 text-lg text-pink-100 transition hover:bg-pink-500/35"
                whileTap={{ scale: 0.96 }}
              >
                Back
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <div className="fixed inset-0 z-40 pointer-events-none w-full h-full overflow-hidden">
          {showHearts &&
            hearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ x: heart.x, y: heart.y, opacity: 0, scale: 0, rotate: heart.rotation }}
                animate={{
                  y: -200,
                  x: heart.x,
                  opacity: [0, 1, 1, 0.8, 0],
                  scale: [0, 1.4, 1.2, 0.9, 0.4],
                  rotate: heart.rotation + 720,
                }}
                transition={{ duration: 4, delay: heart.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute pointer-events-none"
              >
                <Heart
                  className={`${heart.color} fill-current drop-shadow-lg`}
                  size={heart.size}
                  style={{ filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.6))" }}
                />
              </motion.div>
            ))}
        </div>
      </AnimatePresence>
    </div>
  )
}
