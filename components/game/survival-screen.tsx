'use client'

import { AudioPlayer } from './audio-player'
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

  // STATE MỚI: Quản lý độ khó
  const [timeSpent, setTimeSpent] = useState(0)

  const playerLaneRef = useRef(playerLane)
  const correctRef = useRef(0)
  const idRef = useRef(0)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const shake = useAnimationControls()

  const active = lives > 0 && !allAnswered
  const question = QUESTIONS[qIndex]

  // TÍNH TOÁN ĐỘ KHÓ DỰA VÀO THỜI GIAN
  // Cứ sau 7 giây, mỗi 3 giây tiếp theo sẽ tăng 1 cấp độ khó
  const difficultyLevel = timeSpent >= 7 ? Math.floor((timeSpent - 7) / 3) : 0;
  // Tốc độ bắn: giảm dần (nhanh hơn), tối thiểu 300ms
  const currentInterval = Math.max(300, bulletIntervalMs - difficultyLevel * 150);
  // Tốc độ rơi: giảm dần (nhanh hơn), tối thiểu 800ms
  const currentFallTime = Math.max(800, bulletFallMs - difficultyLevel * 150);

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
    const newId = idRef.current
    setFeedback({ id: newId, kind, text })

    const t = setTimeout(() => {
      setFeedback((current) => (current?.id === newId ? null : current))
    }, 5000)
    timeoutsRef.current.push(t)
  }, [])

  const takeDamage = useCallback(
    (text: string, amount: number) => {
      setLives((l) => Math.max(0, l - amount)) 
      setDamageKey((k) => k + 1)
      showFeedback(text.startsWith('Trúng') ? 'hit' : 'wrong', text)
      shake.start({ x: [0, -16, 14, -10, 8, -4, 0], transition: { duration: 0.45 } })
    },
    [shake, showFeedback],
  )

  // BỘ ĐẾM THỜI GIAN (Chỉ chạy khi chưa trả lời và còn sống)
  useEffect(() => {
    if (!active || selected !== null) return
    const interval = setInterval(() => {
      setTimeSpent((t) => t + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [active, selected])

  // HIỆU ỨNG BẮN ĐẠN (Phụ thuộc vào độ khó)
  useEffect(() => {
    if (!active || selected !== null) return // Dừng bắn khi đã chọn đáp án
    
    const spawn = () => {
      idRef.current += 1
      const lane1 = Math.random() < 0.5 ? playerLaneRef.current : Math.floor(Math.random() * lanes)
      const newBullet = { id: idRef.current, lane: lane1 }
      
      setBullets((b) => [...b, newBullet])
      const t1 = setTimeout(() => handleBulletLanded(newBullet), currentFallTime)
      timeoutsRef.current.push(t1)

      // Bắn 2 viên nếu độ khó cao
      const doubleShotChance = difficultyLevel >= 2 ? 0.6 : (difficultyLevel >= 1 ? 0.4 : 0.3);
      if (Math.random() < doubleShotChance) {
        idRef.current += 1
        let lane2 = Math.floor(Math.random() * lanes)
        while (lane2 === lane1) {
          lane2 = Math.floor(Math.random() * lanes)
        }
        const newBullet2 = { id: idRef.current, lane: lane2 }
        setBullets((b) => [...b, newBullet2])
        const t2 = setTimeout(() => handleBulletLanded(newBullet2), currentFallTime)
        timeoutsRef.current.push(t2)
      }
    }
    
    const first = setTimeout(spawn, 600)
    const interval = setInterval(spawn, currentInterval)
    return () => {
      clearTimeout(first)
      clearInterval(interval)
    }
  }, [active, selected, currentFallTime, currentInterval, difficultyLevel]) // Thêm selected để ngừng bắn khi đang xem giải thích

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
    if (active && selected === null && bullet.lane === playerLaneRef.current) {
      takeDamage('Trúng đạn! -1 mạng', 1)
    }
  }

  function handleAnswer(index: number) {
    if (selected !== null || !active) return
    setSelected(index)
    
    setBullets([])
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    if (index === question.correctAnswer) {
      correctRef.current += 1
      showFeedback('correct', 'Né đạn thành công!')
    } else {
      takeDamage('Sai rồi! -3 mạng', 3)
    }
    const t = setTimeout(() => {
      setSelected(null)
      setTimeSpent(0) // Reset lại thời gian cho câu tiếp theo
      if (qIndex + 1 >= QUESTIONS.length) setAllAnswered(true)
      else setQIndex(qIndex + 1)
    }, 1400)
    timeoutsRef.current.push(t)
  }

    return (
    <motion.section animate={shake} className="relative flex h-full flex-col" aria-label="Giai đoạn 2: Sinh tồn">
      <AudioPlayer src="/audio/chapter2.mp3" />
      <div className="relative min-h-[34dvh] flex-1 overflow-hidden border-b-2 border-primary/60">
        <Image src="/images/war.png" alt="" fill sizes="768px" className="object-cover opacity-45" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-secondary/40 to-background/80"
          animate={{ opacity: difficultyLevel >= 2 ? [0.6, 0.9, 0.6] : [0.85, 1, 0.85] }}
          transition={{ duration: difficultyLevel >= 2 ? 1.5 : 4, repeat: Infinity }}
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

        {/* CẢNH BÁO ĐỘ KHÓ */}
        {difficultyLevel > 0 && selected === null && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="absolute top-12 left-1/2 -translate-x-1/2 z-30 rounded-full bg-destructive/90 px-4 py-1 text-xs font-bold text-white shadow-[0_0_15px_rgba(255,0,0,0.8)] animate-pulse"
          >
            CẢNH BÁO: HỎA LỰC TĂNG CẤP {difficultyLevel}!
          </motion.div>
        )}

        <Hud lives={lives} qIndex={qIndex} />

        {bullets.map((bullet) => (
          <motion.div
            key={bullet.id}
            aria-hidden="true"
            className="absolute z-10 h-9 w-3 -translate-x-1/2 rounded-full bg-gradient-to-b from-accent via-primary to-destructive shadow-[0_0_16px_4px] shadow-destructive/60"
            style={{ left: laneCenter(bullet.lane) }}
            initial={{ top: '-12%' }}
            animate={{ top: '85%' }} 
            transition={{ duration: currentFallTime / 1000, ease: 'linear' }}
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
          {feedback && selected !== null && (
            <motion.div
              key={feedback.id}
              role="status"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="pointer-events-none absolute inset-x-4 top-2 z-40 mx-auto flex max-w-sm flex-col items-center gap-2 rounded-lg border-2 border-accent/50 bg-card/95 p-3 shadow-2xl backdrop-blur-md"
            >
              {question.id === 9 && (
                <img src="/images/lenin4.png" alt="Lenin" className="w-full max-h-32 rounded-md object-cover" />
              )}
              {question.id === 12 && (
                <img src="/images/afghanistan.png" alt="Afghanistan" className="w-full max-h-32 rounded-md object-cover" />
              )}
              {question.id === 13 && (
                <img src="/images/gorbachev.png" alt="Gorbachev" className="w-full max-h-32 rounded-md object-cover" />
              )}
              
              <p className={cn(
                'text-center font-serif text-lg font-bold drop-shadow-md',
                feedback.kind === 'correct' ? 'text-success' : 'text-destructive',
              )}>
                {feedback.text}
              </p>
              <p className="text-center text-xs text-muted-foreground">
                {question.explanation}
              </p>
            </motion.div>
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