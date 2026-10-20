'use client'

import { AnimatePresence, motion } from 'framer-motion'

type GameHeaderProps = {
  chapter: 1 | 2
}

const CHAPTERS = {
  1: { numeral: 'CHƯƠNG I', title: 'KHÁM PHÁ' },
  2: { numeral: 'CHƯƠNG II', title: 'SINH TỒN' },
} as const

export function GameHeader({ chapter }: GameHeaderProps) {
  const current = CHAPTERS[chapter]

  return (
    <header className="relative z-30 grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-border bg-card/95 px-3 py-2 backdrop-blur-sm">
      <div className="min-w-0 justify-self-start overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={chapter}
            className="font-serif text-[10px] font-bold uppercase leading-tight tracking-wider text-primary sm:text-xs"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
          >
            <span className="sr-only">Chương hiện tại: </span>
            <span className="block sm:inline">{current.numeral}:</span>{' '}
            <span className="block text-foreground sm:inline">{current.title}</span>
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="justify-self-center whitespace-nowrap font-serif text-xs font-bold uppercase tracking-[0.25em] text-accent sm:text-sm">
        Lịch sử 11
      </p>

      <p className="min-w-0 justify-self-end text-right font-serif text-[10px] font-bold leading-tight tracking-wide text-muted-foreground sm:text-xs">
        <span className="block uppercase text-primary sm:inline">BÀI 3_</span>
        <span className="block text-foreground/80 sm:inline">Cộng hoà xã hội chủ nghĩa Xô Viết</span>
      </p>
    </header>
  )
}
