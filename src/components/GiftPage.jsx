"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Heart } from "lucide-react"

export default function GiftPage({ setCurrentPage }) {
  const [giftOpened, setGiftOpened] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)

  const openGift = () => {
    setGiftOpened(true)
    setTimeout(() => {
      setShowSurprise(true)
    }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden pb-10">
      {/* Floating cute elements */}
      <motion.div
        className="absolute top-40 md:top-20 left-8 text-2xl"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        🎁
      </motion.div>

      <motion.div
        className="absolute md:top-32 right-10 text-xl"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 1,
        }}
      >
        ✨
      </motion.div>

      {/* Main Title - Hides when gift is opened for cleaner UI */}
      <AnimatePresence>
        {!giftOpened && (
          <motion.h2
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl text-pink-300 mb-16 mt-10 md:mt-0"
          >
            I have something special for you... 💝
          </motion.h2>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative"
      >
        <AnimatePresence mode="wait">
          {!giftOpened ? (
            <motion.div
              key="gift-box"
              exit={{
                scale: 0,
                opacity: 0,
                y: -50,
              }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="cursor-pointer group relative"
              onClick={openGift}
            >
              {/* Cute glow around gift */}
              <div className="absolute inset-0 w-56 h-56 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl scale-110 group-hover:scale-120 transition-transform duration-300"></div>

              <motion.img
                src="/gifs/gift.gif"
                alt="Gift box"
                className="w-56 h-56 mx-auto relative z-10 drop-shadow-2xl"
                animate={{
                  rotate: [0, 2, -2, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <motion.p
                animate={{
                  y: [0, -3, 0],
                  textShadow: [
                    "0 0 10px rgba(236, 72, 153, 0.5)",
                    "0 0 20px rgba(236, 72, 153, 0.8)",
                    "0 0 10px rgba(236, 72, 153, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="text-pink-200 mt-6 text-xl relative z-10"
              >
                Click to open! 🎁✨
              </motion.p>

              {/* Floating sparkles around gift */}
              <motion.div
                className="absolute -top-2 -right-2 text-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                ⭐
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="opened-gift"
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-10"
            >
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-full h-full"
              >
                {/* Beautiful aura around flower teddy */}
                <div className="absolute w-64 h-64 mx-auto inset-0 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full blur-2xl scale-110"></div>

                <img
                  src="/gifs/teddy-giving-flower.gif"
                  alt="Teddy giving flower"
                  className="w-52 mx-auto relative z-10 drop-shadow-2xl"
                />

                {/* Floating elements around teddy */}
                <motion.div
                  className="absolute -top-3 -right-3 text-xl"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 15, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  🌸
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-2 text-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1,
                  }}
                >
                  💕
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {showSurprise && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="space-y-6 max-w-lg flex flex-col items-center mx-auto"
                  >
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-2xl text-pink-300 leading-relaxed font-medium"
                    >
                      This flower will never wilt... 🌹
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-lg text-purple-200 leading-relaxed"
                    >
                      Just like I'm never gonna leave you... I promise to cherish you every single day, and never take your beautiful heart for granted again. 💖
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      className="text-xl text-pink-200"
                    >
                      You mean everything to me 💕✨
                    </motion.p>
                    
                    {/* FIXED: Changed to Thank You instead of asking for forgiveness again */}
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      className="text-2xl text-pink-300 font-medium mt-4"
                    >
                      Thank you for giving me another chance... 🥺💖
                    </motion.p>

                    <motion.button
                      onClick={() => setCurrentPage("final")}
                      className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500/30 to-purple-500/30 backdrop-blur-sm border border-pink-300/40 rounded-full text-pink-200 text-lg hover:from-pink-500/40 hover:to-purple-500/40 transition-all duration-500 shadow-xl shadow-pink-500/30 flex gap-3 relative overflow-hidden"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)",
                        y: -2,
                      }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                    >
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
                      <Heart size={20} className="text-pink-200 relative z-10" />
                      <span className="relative z-10">One last thing...</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced floating animation with more variety */}
      {giftOpened && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-300 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}