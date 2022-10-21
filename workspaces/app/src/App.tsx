import { motion } from 'framer-motion'
import { useState } from 'react'

export const DropInAnimation = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      damping: 25,
      stiffness: 100,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

function App() {
  return <div className="w-full h-full bg-slate-500"></div>
}

export default App
