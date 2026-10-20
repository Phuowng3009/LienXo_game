'use client'

import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StartScreen } from './start-screen'
import { StoryScreen } from './story-screen'
import { WarTransition } from './war-transition'
import { SurvivalScreen, type SurvivalResult } from './survival-screen'
import { EndScreen } from './end-screen'
import { GameHeader } from './game-header'

type Phase = 'start' | 'story' | 'war' | 'survival' | 'end'

export function Game() {
  const [phase, setPhase] = useState<Phase>('start')
  const [result, setResult] = useState<SurvivalResult | null>(null)
  const [attempt, setAttempt] = useState(0)

  const handleSurvivalEnd = useCallback((r: SurvivalResult) => {
    setResult(r)
    setPhase('end')
  }, [])

  return (
    <main className="mx-auto flex h-dvh w-full max-w-2xl flex-col overflow-hidden bg-background shadow-2xl sm:border-x sm:border-border">
      <GameHeader chapter={phase === 'start' || phase === 'story' ? 1 : 2} />
      <div className="relative min-h-0 flex-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={phase === 'survival' ? `survival-${attempt}` : phase}
          className="h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: phase === 'story' ? 0.15 : 0.4 } }}
          transition={{ duration: 0.6 }}
        >
          {phase === 'start' && <StartScreen onStart={() => setPhase('story')} />}
          {phase === 'story' && <StoryScreen onComplete={() => setPhase('war')} />}
          {phase === 'war' && <WarTransition onStart={() => setPhase('survival')} />}
          {phase === 'survival' && <SurvivalScreen onEnd={handleSurvivalEnd} />}
          {phase === 'end' && result && (
            <EndScreen
              result={result}
              onRetry={() => {
                setAttempt((a) => a + 1)
                setPhase('survival')
              }}
              onRestart={() => setPhase('start')}
            />
          )}
        </motion.div>
      </AnimatePresence>
      </div>
    </main>
  )
}
