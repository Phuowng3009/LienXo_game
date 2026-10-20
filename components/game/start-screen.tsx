'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Footprints } from 'lucide-react'
import { GameButton } from './game-button'

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex h-full flex-col overflow-hidden" aria-labelledby="game-title">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      >
        <Image
          src="/images/title.png"
          alt="Phố thị nước Nga phủ tuyết lúc hoàng hôn, một người nông dân bước đi đơn độc"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      <div className="absolute inset-0 shadow-[inset_0_0_120px_40px] shadow-background" />

      <div className="relative z-10 mt-auto flex flex-col items-center gap-6 px-6 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Năm 1924 · Nước Nga Xô viết</p>
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-accent/60" />
            <span className="size-1.5 rotate-45 bg-primary" />
            <span className="h-px w-10 bg-accent/60" />
          </div>
          <h1 id="game-title" className="text-balance font-serif text-5xl font-bold leading-tight text-foreground sm:text-6xl">
            Phố Xô Viết
          </h1>
          <p className="font-serif text-lg italic text-accent">Hành trình của người nông dân</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-sm text-pretty leading-relaxed text-muted-foreground"
        >
          Bạn là Ivan, một nông dân lên phố mua báo. Hãy lắng nghe người dân, thu thập 4 mảnh ghép kiến thức… vì
          khói lửa chiến tranh có thể ập đến bất cứ lúc nào.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="w-full max-w-sm"
        >
          <GameButton onClick={onStart} className="w-full">
            <Footprints className="size-5" aria-hidden="true" />
            Bắt đầu cuộc hành trình
          </GameButton>
        </motion.div>
      </div>
    </section>
  )
}
