'use client'

// Throwaway smoke-test route for `liquid-glass-react`.
// Safe to delete: nothing else in the site imports it.

import { useRef } from 'react'
import dynamic from 'next/dynamic'

// `liquid-glass-react` reads `navigator` at module scope, which throws during
// server rendering. It has to be loaded client-side only.
const LiquidGlass = dynamic(() => import('liquid-glass-react'), { ssr: false })

export default function GlassDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/real-jamon-board.jpg')" }}
    >
      <LiquidGlass
        displacementScale={70}
        blurAmount={0.0625}
        saturation={140}
        aberrationIntensity={2}
        elasticity={0.15}
        cornerRadius={32}
        padding="24px 32px"
        mode="standard"
        mouseContainer={containerRef}
        style={{ position: 'fixed', top: '40%', left: '50%' }}
      >
        <div className="text-white">
          <h2 className="text-2xl tracking-widest uppercase">IBÉRICO</h2>
          <p className="mt-2 text-sm opacity-80">Liquid glass smoke test</p>
        </div>
      </LiquidGlass>
    </div>
  )
}
