'use client'

import { useState, useEffect, useRef } from 'react'

export default function BabySong() {
  const [stage, setStage] = useState(0)
  const [balloons, setBalloons] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const balloonIdRef = useRef(0)

  const lyrics = [
    { text: "Baby, baby, don't you cry,", emoji: "👧", delay: 3000 },
    { text: "We can fix it, give it a try!", emoji: "👧", delay: 3000 },
    { text: "What do you need to smile today?", emoji: "👧", delay: 3000 },
    { text: "A balloon to chase and play? 🎈", emoji: "👧", delay: 3000 },
    { text: "Here you go, it's bright and new,", emoji: "🧒", delay: 3000 },
    { text: "Red and shiny—just for you!", emoji: "🧒", delay: 3000 },
    { text: "Now we're laughing, me and you,", emoji: "🧒", delay: 3000 },
    { text: "Hooray! We're happy too! 😄", emoji: "🧒", delay: 3000 },
    { text: "♪ La la la ♪", emoji: "🎵", delay: 0 }
  ]

  useEffect(() => {
    if (playing && stage < lyrics.length) {
      const timer = setTimeout(() => {
        setStage(stage + 1)
        if (stage === 3 || stage === 7) {
          createBalloon()
        }
      }, lyrics[stage].delay)
      return () => clearTimeout(timer)
    }
  }, [stage, playing])

  const createBalloon = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94']
    const newBalloon = {
      id: balloonIdRef.current++,
      x: Math.random() * 80 + 10,
      y: 100,
      color: colors[Math.floor(Math.random() * colors.length)]
    }
    setBalloons(prev => [...prev, newBalloon])

    setTimeout(() => {
      setBalloons(prev => prev.filter(b => b.id !== newBalloon.id))
    }, 4000)
  }

  const handleStart = () => {
    setPlaying(true)
    setStage(0)
    setBalloons([])
  }

  const handleReset = () => {
    setPlaying(false)
    setStage(0)
    setBalloons([])
  }

  const currentLyric = stage < lyrics.length ? lyrics[stage] : null

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
      color: 'white',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {balloons.map(balloon => (
        <div
          key={balloon.id}
          style={{
            position: 'absolute',
            left: `${balloon.x}%`,
            top: `${balloon.y}%`,
            fontSize: '60px',
            animation: 'floatUp 4s ease-out forwards',
            cursor: 'pointer',
            transform: 'translateX(-50%)'
          }}
          onClick={(e) => {
            e.currentTarget.style.animation = 'pop 0.3s ease-out forwards'
            setTimeout(() => {
              setBalloons(prev => prev.filter(b => b.id !== balloon.id))
            }, 300)
          }}
        >
          🎈
        </div>
      ))}

      <style jsx>{`
        @keyframes floatUp {
          0% {
            top: 100%;
            transform: translateX(-50%) rotate(0deg);
            opacity: 1;
          }
          100% {
            top: -10%;
            transform: translateX(-50%) rotate(15deg);
            opacity: 0;
          }
        }

        @keyframes pop {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) scale(2);
            opacity: 0;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        zIndex: 1
      }}>
        {!playing ? (
          <div>
            <h1 style={{
              fontSize: '48px',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              🎵 Baby Song 🎵
            </h1>
            <button
              onClick={handleStart}
              style={{
                fontSize: '24px',
                padding: '15px 40px',
                background: '#FFE66D',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 'bold',
                color: '#667eea',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s',
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              ▶️ Start Song
            </button>
          </div>
        ) : (
          <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
            {currentLyric && (
              <>
                <div style={{
                  fontSize: '72px',
                  marginBottom: '20px',
                  animation: 'bounce 1s ease-in-out infinite'
                }}>
                  {currentLyric.emoji}
                </div>
                <h2 style={{
                  fontSize: '32px',
                  lineHeight: '1.6',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  marginBottom: '30px'
                }}>
                  {currentLyric.text}
                </h2>
              </>
            )}

            {stage >= lyrics.length && (
              <div>
                <p style={{ fontSize: '24px', marginBottom: '20px' }}>
                  🎉 The End! 🎉
                </p>
                <button
                  onClick={handleReset}
                  style={{
                    fontSize: '20px',
                    padding: '12px 30px',
                    background: '#4ECDC4',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontWeight: 'bold',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  🔄 Play Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        fontSize: '14px',
        opacity: 0.7
      }}>
        Click balloons to pop them! 🎈
      </div>
    </div>
  )
}
