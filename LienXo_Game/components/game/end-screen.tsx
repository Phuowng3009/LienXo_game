'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, RotateCcw, ScrollText, Skull, Trophy, ArrowRight, ShieldAlert, Award } from 'lucide-react'
import { QUESTIONS } from '@/lib/game-data'
import { cn } from '@/lib/utils'
import { GameButton } from './game-button'
import type { SurvivalResult } from './survival-screen'

type EndScreenProps = {
  result: SurvivalResult
  onRetry: () => void
  onRestart: () => void
}

export function EndScreen({ result, onRetry, onRestart }: EndScreenProps) {
  const { won, lives, correct } = result
  
  // MẶC ĐỊNH: KỊCH BẢN THUA (Game Over)
  let Icon = Skull
  let title = "NẠN NHÂN CỦA LỊCH SỬ"
  let colorClass = "text-destructive"
  let quote = "Ivan đã gục ngã giữa làn đạn. Lịch sử luôn có những bài học cho những ai còn sống sót. Khi người dân mất đi tiếng nói, đất nước sẽ đi đến diệt vong..."
  let lessonTitle = "Bài học về sự Tha hóa"
  let lessonContent = "Sự sụp đổ của Liên Xô bắt nguồn từ việc bộ máy quan liêu tha hóa, tham nhũng, sống xa hoa trong khi người dân xếp hàng mua bánh mì. Một Đảng cầm quyền nếu không tự đổi mới và để người dân giám sát quyền lực, thì 'lý tưởng' sẽ bị 'bộ máy' nuốt chửng."

  // KỊCH BẢN 1: CHIẾN THẮNG VẺ VANG (Trả lời đúng >= 12 câu)
  if (won && correct >= 12) {
    Icon = Award
    title = "NHÀ SỬ HỌC VĨ ĐẠI"
    colorClass = "text-primary"
    quote = "Cháu không chỉ sống sót, cháu còn thấu hiểu tường tận bản chất của một đế chế. Hãy nhớ, mọi lý tưởng vĩ đại đều có thể bị bóp méo bởi quyền lực..."
    lessonTitle = "Bài học về Lý tưởng và Thực dụng"
    lessonContent = "Lenin có lý tưởng nhưng bệnh nặng. Stalin thực dụng và nắm bộ máy. Trong khủng hoảng, lịch sử thường chọn kẻ thực dụng tàn nhẫn thay vì người lý tưởng hóa. Mô hình Liên bang từ đây mang sẵn gen 'độc tài'."
  } 
  // KỊCH BẢN 2: SỐNG SÓT SÁT NÚT (Thắng nhưng trả lời đúng < 12 câu)
  else if (won) {
    Icon = Trophy
    title = "NGƯỜI SỐNG SÓT KIÊN CƯỜNG"
    colorClass = "text-accent"
    quote = "Ta đã sống sót qua cuộc chiến. Nhưng này cháu, có một sự thật đau lòng: Liên bang Xô Viết vĩ đại mà ta vừa bảo vệ... đã sụp đổ vào năm 1991..."
    lessonTitle = "Bài học về 'Quả bom nổ chậm'"
    lessonContent = "Hiến pháp 1924 cho phép quyền ly khai, nhưng suốt 70 năm không ai thực hiện được vì Đảng kiểm soát. Chỉ đến năm 1991, khi Đảng suy yếu, các nước mới viện dẫn đúng điều luật này để tách ra. Liên Xô đã chết bằng chính văn bản khai sinh ra nó."
  }

  return (
    <section className="relative flex h-full flex-col overflow-y-auto overflow-x-hidden" aria-labelledby="end-title">
      <Image
        src={won ? '/images/title.png' : '/images/war.png'}
        alt=""
        fill
        sizes="768px"
        className={cn('object-cover fixed', won ? 'opacity-30' : 'opacity-20 grayscale-[80%]')}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background fixed" />

      <div className="relative z-10 my-auto flex flex-col items-center gap-6 px-4 py-10 sm:px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className={cn(
            'flex size-20 items-center justify-center rounded-full border-2',
            won ? 'border-accent bg-accent/15 text-accent' : 'border-destructive bg-destructive/15 text-destructive',
          )}
        >
          <Icon className="size-10" aria-hidden="true" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 id="end-title" className={cn("text-balance font-serif text-3xl font-bold sm:text-4xl", colorClass)}>
            {won ? 'Bạn đã sống sót!' : 'Game Over'}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
            Danh hiệu: <span className={cn("font-bold", colorClass)}>{title}</span>
          </p>
        </motion.div>

        {/* LÁ THƯ TỪ TƯƠNG LAI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.4 }}
          className="w-full max-w-lg rounded-md border border-accent/40 bg-card/90 p-5 text-left shadow-2xl backdrop-blur-sm"
        >
          <p className="font-serif text-sm leading-relaxed text-card-foreground italic">
            "{quote}"
          </p>
          <p className="mt-3 text-right font-serif text-sm font-bold text-accent">
            - Ivan, Nông dân Nga (1922)
          </p>
        </motion.div>

        {/* THỐNG KÊ */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid w-full max-w-sm grid-cols-2 gap-3"
        >
          <div className="rounded-md border border-border bg-card/80 p-3">
            <dt className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
              <Heart className="size-3.5" aria-hidden="true" />
              Mạng còn lại
            </dt>
            <dd className="mt-1 font-serif text-2xl font-bold text-destructive">{lives}</dd>
          </div>
          <div className="rounded-md border border-border bg-card/80 p-3">
            <dt className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
              <ScrollText className="size-3.5" aria-hidden="true" />
              Trả lời đúng
            </dt>
            <dd className="mt-1 font-serif text-2xl font-bold text-success">
              {correct}/{QUESTIONS.length}
            </dd>
          </div>
        </motion.dl>

        {/* MẢNH GHÉP CUỐI CÙNG - BÀI HỌC (Thay đổi theo kết quả) */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8 }}
           className="w-full max-w-lg mt-4 border-t border-border pt-4 bg-secondary/20 p-4 rounded-lg"
        >
           <h3 className="font-serif text-lg font-semibold text-foreground mb-2 flex items-center justify-center gap-2">
              <ShieldAlert className="size-5 text-accent" /> {lessonTitle}
           </h3>
           <p className="text-sm text-muted-foreground leading-relaxed text-justify">
             {lessonContent}
           </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex w-full max-w-sm flex-col gap-2 mt-4"
        >
          <GameButton onClick={onRetry} className="w-full">
            <RotateCcw className="size-5" aria-hidden="true" />
            Thử thách lại màn sinh tồn
          </GameButton>
          <GameButton onClick={onRestart} variant="secondary" className="w-full">
            Bắt đầu lại từ đầu
          </GameButton>
        </motion.div>
      </div>
    </section>
  )
}