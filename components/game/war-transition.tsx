'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeftRight, Heart, ListChecks, Siren } from 'lucide-react'
import { QUESTIONS, SURVIVAL_CONFIG } from '@/lib/game-data'
import { GameButton } from './game-button'

const RULES = [
  { icon: ArrowLeftRight, text: 'Dùng phím ← → hoặc nút Trái/Phải để né đạn rơi.' },
  { icon: ListChecks, text: `Trả lời ${QUESTIONS.length} câu hỏi. Đúng: né đạn thành công. Sai: mất 1 mạng.` },
  { icon: Heart, text: `Bạn có ${SURVIVAL_CONFIG.initialLives} mạng. Hết mạng là Game Over.` },
]

export function WarTransition({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex h-full flex-col overflow-hidden" aria-labelledby="war-title">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.3, filter: 'brightness(3)' }}
        animate={{ scale: 1.05, filter: 'brightness(1)', x: [0, -10, 8, -6, 4, 0] }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <Image src="/images/war.png" alt="Phố thị chìm trong khói lửa chiến tranh" fill priority sizes="768px" className="object-cover" />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-primary mix-blend-multiply"
        animate={{ opacity: [0.2, 0.45, 0.25, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />

      <div className="relative z-10 mt-auto flex flex-col gap-5 px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 1.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center"
        >
          <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-destructive">
            <Siren className="size-4" aria-hidden="true" />
            Giai đoạn 2 · Sinh tồn
          </p>
          <h2 id="war-title" className="mt-2 text-balance font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Chiến tranh ập đến!
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-pretty leading-relaxed text-muted-foreground">
            Vừa cầm tờ báo trên tay, tiếng nổ vang trời. Khói lửa mịt mù khắp phố. Ivan phải chạy thoát — và chỉ
            những gì anh đã học mới cứu được anh.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mx-auto flex w-full max-w-sm flex-col gap-2 rounded-md border border-border bg-card/80 p-4 backdrop-blur-sm"
        >
          {RULES.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 text-sm leading-relaxed text-card-foreground">
              <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              {text}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mx-auto w-full max-w-sm"
        >
          <GameButton onClick={onStart} className="w-full">
            Chạy trốn!
          </GameButton>
        </motion.div>
      </div>
    </section>
  )
}
