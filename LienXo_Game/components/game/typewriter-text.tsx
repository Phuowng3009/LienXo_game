'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type TypewriterTextProps = {
  text: string
  /** Hiển thị toàn bộ chữ ngay lập tức (khi người chơi bấm bỏ qua) */
  instant?: boolean
  speed?: number
  onComplete?: () => void
  className?: string
}

export function TypewriterText({ text, instant = false, speed = 28, onComplete, className }: TypewriterTextProps) {
  const [count, setCount] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const finished = instant || count >= text.length

  useEffect(() => {
    if (finished) {
      onCompleteRef.current?.()
      return
    }
    const timer = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(timer)
  }, [count, finished, speed])

  const visible = finished ? text : text.slice(0, count)

  return (
    <span className={cn('whitespace-pre-wrap', className)}>
      {visible}
      {!finished && (
        <span aria-hidden="true" className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-accent" />
      )}
    </span>
  )
}
