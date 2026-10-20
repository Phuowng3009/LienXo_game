'use client'
import { useEffect, useRef } from 'react'

export function AudioPlayer({ src, loop = true }: { src: string, loop?: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35
      audioRef.current.play().catch((e) => {
        console.log("Trình duyệt chặn tự động phát, cần người dùng click:", e)
      })
    }
  }, [src])

  return <audio ref={audioRef} src={src} loop={loop} className="hidden" />
}