"use client"

import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion"

// Каждая буква имеет свою траекторию "разлёта" и возврата
const letters = [
  { char: "c", x: -380, y: -180, rot: -45, scale: 1.6 },
  { char: "o", x: 220, y: -240, rot: 60, scale: 0.7 },
  { char: "l", x: -160, y: 260, rot: -90, scale: 1.3 },
  { char: "d", x: 320, y: 180, rot: 120, scale: 0.8 },
  { char: "d", x: -280, y: 80, rot: 200, scale: 1.4 },
  { char: "e", x: 180, y: -120, rot: -150, scale: 0.6 },
  { char: "v", x: -120, y: -300, rot: 80, scale: 1.5 },
]

function Letter({
  data,
  progress,
  index,
}: {
  data: (typeof letters)[number]
  progress: MotionValue<number>
  index: number
}) {
  // Тайминг разлёта/сбора:
  // 0.0 - 0.15: собрано (intro)
  // 0.15 - 0.5: разлёт (середина страницы)
  // 0.5 - 0.85: всё ещё в разлёте, дрейфует
  // 0.85 - 1.0: собирается обратно
  const stagger = index * 0.02

  const x = useTransform(
    progress,
    [0.1, 0.35 + stagger, 0.7 - stagger, 0.92],
    [0, data.x, data.x * 0.7, 0]
  )
  const y = useTransform(
    progress,
    [0.1, 0.35 + stagger, 0.7 - stagger, 0.92],
    [0, data.y, data.y * 0.7, 0]
  )
  const rotate = useTransform(
    progress,
    [0.1, 0.35 + stagger, 0.7 - stagger, 0.92],
    [0, data.rot, data.rot * 1.4, 0]
  )
  const scale = useTransform(
    progress,
    [0.1, 0.35 + stagger, 0.7 - stagger, 0.92],
    [1, data.scale, data.scale * 0.9, 1]
  )
  const opacity = useTransform(
    progress,
    [0, 0.05, 0.4, 0.7, 0.9, 1],
    [0.18, 0.18, 0.08, 0.08, 0.18, 0.22]
  )

  // Сглаживаем для красивого "плывущего" движения
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 1 })
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 1 })
  const sr = useSpring(rotate, { stiffness: 60, damping: 20, mass: 1 })
  const sc = useSpring(scale, { stiffness: 60, damping: 20, mass: 1 })

  return (
    <motion.span
      style={{
        x: sx,
        y: sy,
        rotate: sr,
        scale: sc,
        opacity,
        display: "inline-block",
        fontFamily: "var(--font-handwriting)",
      }}
      className="font-handwriting text-primary"
    >
      {data.char}
    </motion.span>
  )
}

export function ColdDevBackground() {
  const { scrollYProgress } = useScroll()

  // Лёгкое колыхание всей надписи во время "разлома"
  const groupRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 4, -2])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ rotate: groupRotate, fontFamily: "var(--font-handwriting)" }}
        className="font-handwriting text-[28vw] leading-none tracking-tight whitespace-nowrap select-none"
      >
        {letters.map((l, i) => (
          <Letter key={i} data={l} progress={scrollYProgress} index={i} />
        ))}
      </motion.div>
    </div>
  )
}
