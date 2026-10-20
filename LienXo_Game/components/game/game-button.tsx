'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type GameButtonProps = HTMLMotionProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function GameButton({ variant = 'primary', className, children, ...props }: GameButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={cn(
        'relative inline-flex min-h-14 select-none items-center justify-center gap-2 rounded-md px-6 font-serif text-lg font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' &&
          'border border-accent/40 bg-primary text-primary-foreground shadow-[0_0_24px_-6px] shadow-primary hover:bg-primary/85',
        variant === 'secondary' &&
          'border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80',
        variant === 'ghost' && 'text-muted-foreground hover:text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
