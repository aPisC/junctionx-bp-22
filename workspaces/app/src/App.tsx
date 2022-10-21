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
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={DropInAnimation}
        className="w-10 h-10 bg-slate-500"
      ></motion.div>
    </div>
  )
}

export default App
