'use client'

import { AudioPlayer } from './audio-player'
import { HistoryNewspaperModal } from './history-newspaper-modal'
import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Newspaper, ScrollText } from 'lucide-react'
import { STATIONS } from '@/lib/game-data'
import { cn } from '@/lib/utils'
import { GameButton } from './game-button'
import { TypewriterText } from './typewriter-text'

export function StoryScreen({ onComplete }: { onComplete: () => void }) {
  const [stationIndex, setStationIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [typingDone, setTypingDone] = useState(false)
  const [showNewspaperModal, setShowNewspaperModal] = useState(false)

  const station = STATIONS[stationIndex]
  const isLastLine = lineIndex === station.lines.length - 1
  const stationFinished = isLastLine && typingDone
  const collectedCount = stationIndex + (stationFinished ? 1 : 0)
  const journeyFinished = stationIndex === STATIONS.length - 1 && stationFinished

  function handleNext() {
    if (!typingDone) {
      setTypingDone(true)
      return
    }
    if (!isLastLine) {
      setLineIndex((i) => i + 1)
      setTypingDone(false)
      return
    }
    if (stationIndex < STATIONS.length - 1) {
      setStationIndex((i) => i + 1)
      setLineIndex(0)
      setTypingDone(false)
    }
  }

    return (
    <section className="flex h-full flex-col" aria-label="Giai đoạn 1: Khám phá phố thị">
      <AudioPlayer src="/audio/chapter1.mp3" />
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={station.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <Image
              src={station.image || '/placeholder.svg'}
              alt={station.imageAlt}
              fill
              priority={station.id === 1}
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />

        <header className="relative z-10 flex items-start justify-between gap-3 p-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={station.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              className="rounded-sm border border-accent/30 bg-background/70 px-3 py-1.5 font-serif text-sm text-accent backdrop-blur-sm"
            >
              {station.title}
            </motion.p>
          </AnimatePresence>
          <FragmentTracker collected={collectedCount} />
        </header>

        <AnimatePresence>
          {stationFinished && (
            <motion.div
              key={`fragment-${station.id}`}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="absolute inset-x-4 bottom-4 z-10 mx-auto max-w-md rounded-md border border-accent/50 bg-card/90 p-4 shadow-2xl backdrop-blur-sm"
              role="status"
            >
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
                <ScrollText className="size-4" aria-hidden="true" />
                Mảnh ghép kiến thức {station.id}/{STATIONS.length}
              </p>
              <p className="mt-1 font-serif text-lg font-semibold text-foreground">{station.fragment.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{station.fragment.summary}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative border-t-2 border-primary/60 bg-card px-4 pb-5 pt-6">
        <p className="absolute -top-4 left-4 rounded-sm border border-accent/40 bg-primary px-3 py-1 font-serif text-sm font-semibold text-primary-foreground">
          {station.speaker}
        </p>

        <div
          className="min-h-32 cursor-pointer text-base leading-relaxed text-card-foreground sm:text-lg"
          onClick={() => !typingDone && setTypingDone(true)}
          aria-live="polite"
        >
                    {station.mode === 'murmur' ? (
            <div className="flex flex-col gap-2 italic">
              {station.lines.slice(0, lineIndex).map((line) => (
                <p key={line} className="text-muted-foreground/70">
                  {line}
                </p>
              ))}
              <p key={`${station.id}-${lineIndex}`}>
                <TypewriterText
                  text={station.lines[lineIndex]}
                  instant={typingDone}
                  speed={32}
                  onComplete={() => setTypingDone(true)}
                />
              </p>
            </div>
          ) : (
            <p>
              <TypewriterText
                key={`${station.id}-${lineIndex}`}
                text={station.lines[lineIndex]}
                instant={typingDone}
                onComplete={() => setTypingDone(true)}
              />
            </p>
          )}
        </div> {/* <--- TỚ ĐÃ THÊM THẺ ĐÓNG NÀY ĐỂ KẾT THÚC KHUNG CHAT */}

        <div className="mt-4">
          {journeyFinished ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <GameButton onClick={() => setShowNewspaperModal(true)} className="w-full">
                <Newspaper className="size-5" aria-hidden="true" />
                Mua báo xong
              </GameButton>
            </motion.div>
          ) : (
            <GameButton onClick={handleNext} variant={typingDone ? 'primary' : 'secondary'} className="w-full">
              Đi tiếp
              <ChevronRight className="size-5" aria-hidden="true" />
            </GameButton>
          )}
        </div>
      </div>

      {/* TỚ ĐÃ CHÈN CÁI MODAL TỜ BÁO VÀO ĐÂY */}
      <HistoryNewspaperModal
        open={showNewspaperModal}
        onContinue={() => {
          setShowNewspaperModal(false)
          onComplete()
        }}
      />

    </section>
  )
  function FragmentTracker({ collected }: { collected: number }) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-sm border border-accent/30 bg-background/70 p-1.5 backdrop-blur-sm"
      aria-label={`Đã thu thập ${collected} trên ${STATIONS.length} mảnh ghép`}
    >
      {STATIONS.map((s, i) => {
        const owned = i < collected
        return (
          <motion.span
            key={s.id}
            animate={owned ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.5 }}
            className={cn(
              'flex size-7 items-center justify-center rounded-sm border',
              owned ? 'border-accent bg-accent text-accent-foreground' : 'border-border bg-muted text-muted-foreground/50',
            )}
          >
            <ScrollText className="size-4" aria-hidden="true" />
          </motion.span>
        )
      })}
    </div>
  )
}
}