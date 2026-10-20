'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, User } from 'lucide-react'
import { QUESTIONS, SURVIVAL_CONFIG } from '@/lib/game-data'
import { cn } from '@/lib/utils'

export type SurvivalResult = {
  won: boolean
  lives: number
  correct: number
}

type Bullet = { id: number; lane: number }
type Feedback = { id: number; kind: 'correct' | 'wrong' | 'hit'; text: string }

const { initialLives, bulletIntervalMs, bulletFallMs, lanes } = SURVIVAL_CONFIG
const laneCenter = (lane: number) => `${((lane + 0.5) / lanes) * 100}%`

export function SurvivalScreen({ onEnd }: { onEnd: (result: SurvivalResult) => void }) {
  const [lives, setLives] = useState(initialLives)
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [allAnswered, setAllAnswered] = useState(false)
  const [playerLane, setPlayerLane] = useState(Math.floor(lanes / 2))
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [damageKey, setDamageKey] = useState(0)

  const playerLaneRef = useRef(playerLane)
  const correctRef = useRef(0)
  const idRef = useRef(0)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const shake = useAnimationControls()

  const active = lives > 0 && !allAnswered
  const question = QUESTIONS[qIndex]

  useEffect(() => {
    playerLaneRef.current = playerLane
  }, [playerLane])

  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), [])

  useEffect(() => {
    if (lives <= 0) onEnd({ won: false, lives: 0, correct: correctRef.current })
    else if (allAnswered) onEnd({ won: true, lives, correct: correctRef.current })
  }, [lives, allAnswered, onEnd])

  const showFeedback = useCallback((kind: Feedback['kind'], text: string) => {
    idRef.current += 1
    setFeedback({ id: idRef.current, kind, text })
  }, [])

  const takeDamage = useCallback(
    (text: string, amount: number) => {
      setLives((l) => Math.max(0, l - amount)) // Trừ đúng số máu
      setDamageKey((k) => k + 1)
      showFeedback(text.startsWith('Trúng') ? 'hit' : 'wrong', text)
      shake.start({ x: [0, -16, 14, -10, 8, -4, 0], transition: { duration: 0.45 } })
    },
    [shake, showFeedback],
  )

  useEffect(() => {
    if (!active) return
        const spawn = () => {
      idRef.current += 1
      const lane1 = Math.random() < 0.5 ? playerLaneRef.current : Math.floor(Math.random() * lanes)
      setBullets((b) => [...b, { id: idRef.current, lane: lane1 }])

      // 30% cơ hội bắn thêm viên thứ 2 ở làn khác
      if (Math.random() < 0.3) {
        idRef.current += 1
        let lane2 = Math.floor(Math.random() * lanes)
        // Đảm bảo viên thứ 2 không trùng làn viên thứ 1
        while (lane2 === lane1) {
          lane2 = Math.floor(Math.random() * lanes)
        }
        setBullets((b) => [...b, { id: idRef.current, lane: lane2 }])
      }
    }
    const first = setTimeout(spawn, 600)
    const interval = setInterval(spawn, bulletIntervalMs)
    return () => {
      clearTimeout(first)
      clearInterval(interval)
    }
  }, [active])

  const move = useCallback(
    (dir: -1 | 1) => {
      if (!active) return
      setPlayerLane((l) => Math.min(lanes - 1, Math.max(0, l + dir)))
    },
    [active],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        e.preventDefault()
        move(-1)
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        e.preventDefault()
        move(1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [move])

  function handleBulletLanded(bullet: Bullet) {
    setBullets((b) => b.filter((x) => x.id !== bullet.id))
    if (active && bullet.lane === playerLaneRef.current) takeDamage('Trúng đạn! -1 mạng', 1)
  }

  function handleAnswer(index: number) {
    if (selected !== null || !active) return
    setSelected(index)
    if (index === question.correctAnswer) {
      correctRef.current += 1
      setBullets([])
      showFeedback('correct', 'Né đạn thành công!')
    } else {
      takeDamage('Sai rồi! -3 mạng', 3)
    }
    const t = setTimeout(() => {
      setSelected(null)
      if (qIndex + 1 >= QUESTIONS.length) setAllAnswered(true)
      else setQIndex(qIndex + 1)
    }, 1400)
    timeoutsRef.current.push(t)
  }

  return (
    <motion.section animate={shake} className="relative flex h-full flex-col" aria-label="Giai đoạn 2: Sinh tồn">
      {/* Arena */}
      <div className="relative min-h-[34dvh] flex-1 overflow-hidden border-b-2 border-primary/60">
        <Image src="/images/war.png" alt="" fill sizes="768px" className="object-cover opacity-45" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-secondary/40 to-background/80"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="absolute inset-0 flex" aria-hidden="true">
          {Array.from({ length: lanes }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 border-r border-dashed border-foreground/10 last:border-r-0 transition-colors',
                i === playerLane && 'bg-foreground/5',
              )}
            />
          ))}
        </div>

        <Hud lives={lives} qIndex={qIndex} />

        {bullets.map((bullet) => (
          <motion.div
            key={bullet.id}
            aria-hidden="true"
            className="absolute z-10 h-9 w-3 -translate-x-1/2 rounded-full bg-gradient-to-b from-accent via-primary to-destructive shadow-[0_0_16px_4px] shadow-destructive/60"
            style={{ left: laneCenter(bullet.lane) }}
            initial={{ top: '-12%' }}
            animate={{ top: '80%' }}
            transition={{ duration: bulletFallMs / 1000, ease: 'easeIn' }}
            onAnimationComplete={() => handleBulletLanded(bullet)}
          />
        ))}

        <motion.div
          className="absolute bottom-3 z-20 flex size-12 -translate-x-1/2 items-center justify-center rounded-md border-2 border-accent bg-foreground text-background shadow-lg"
          animate={{ left: laneCenter(playerLane) }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
          aria-label={`Nhân vật ở làn ${playerLane + 1} trên ${lanes}`}
          role="img"
        >
          <User className="size-7" aria-hidden="true" />
        </motion.div>

        <AnimatePresence>
          {feedback && (
            <motion.p
              key={feedback.id}
              role="status"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: [0, 1, 1, 0], y: -30, scale: 1 }}
              transition={{ duration: 1.3, times: [0, 0.15, 0.7, 1] }}
              className={cn(
                'pointer-events-none absolute inset-x-0 top-1/3 z-30 text-center font-serif text-3xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]',
                feedback.kind === 'correct' ? 'text-success' : 'text-destructive',
              )}
            >
              {feedback.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Question & controls */}
      <div className="flex flex-col gap-3 bg-card px-4 pb-4 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            <h2 className="text-pretty font-serif text-lg font-semibold leading-snug text-card-foreground">
              {question.question}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {question.options.map((option, i) => {
                const isCorrect = i === question.correctAnswer
                const revealed = selected !== null
                return (
                  <motion.button
                    key={option}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(i)}
                    disabled={revealed}
                    className={cn(
                      'min-h-14 rounded-md border px-3 py-2 text-left text-sm leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-ring sm:text-base',
                      !revealed && 'border-border bg-secondary text-secondary-foreground hover:border-accent/60',
                      revealed && isCorrect && 'border-success bg-success/20 text-foreground',
                      revealed && !isCorrect && i === selected && 'border-destructive bg-destructive/25 text-foreground',
                      revealed && !isCorrect && i !== selected && 'border-border bg-muted text-muted-foreground opacity-60',
                    )}
                  >
                    <span className="mr-1.5 font-serif font-bold text-accent">{String.fromCharCode(65 + i)}.</span>
                    {option}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-2">
          <MoveButton direction="left" onPress={() => move(-1)} />
          <MoveButton direction="right" onPress={() => move(1)} />
        </div>
      </div>

      {damageKey > 0 && (
        <motion.div
          key={damageKey}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-40 bg-destructive shadow-[inset_0_0_80px_30px] shadow-destructive"
          initial={{ opacity: 0.55 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.section>
  )
}

function Hud({ lives, qIndex }: { lives: number; qIndex: number }) {
  return (
    <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-2 p-3">
      <div
        className="flex flex-wrap gap-0.5 rounded-sm bg-background/70 p-1.5 backdrop-blur-sm"
        aria-label={`Còn ${lives} mạng`}
        role="status"
      >
        {Array.from({ length: initialLives }).map((_, i) => (
          <motion.span
            key={i}
            animate={i < lives ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Heart
              className={cn('size-4', i < lives ? 'fill-destructive text-destructive' : 'text-muted-foreground')}
              aria-hidden="true"
            />
          </motion.span>
        ))}
      </div>
      <p className="shrink-0 rounded-sm bg-background/70 px-2.5 py-1 font-serif text-sm text-accent backdrop-blur-sm">
        Câu {qIndex + 1}/{QUESTIONS.length}
      </p>
    </div>
  )
}

function MoveButton({ direction, onPress }: { direction: 'left' | 'right'; onPress: () => void }) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onPointerDown={(e) => {
        e.preventDefault()
        onPress()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onPress()
        }
      }}
      className="flex min-h-14 touch-manipulation select-none items-center justify-center gap-1 rounded-md border border-accent/40 bg-muted font-serif text-lg font-semibold text-foreground active:bg-primary"
      aria-label={direction === 'left' ? 'Di chuyển sang trái' : 'Di chuyển sang phải'}
    >
      {direction === 'left' && <Icon className="size-6" aria-hidden="true" />}
      {direction === 'left' ? 'Trái' : 'Phải'}
      {direction === 'right' && <Icon className="size-6" aria-hidden="true" />}
    </motion.button>
  )
}
