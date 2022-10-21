import { useState, useEffect, ReactNode } from 'react'

interface WindowSizeProps {
  width: number
  height: number
}

interface AppWrapperProps {
  children: ReactNode
}

function AppWrapper({ children }: AppWrapperProps) {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>({ height: 0, width: 0 })
  useEffect(() => {
    const handleResize = () => {
      let newHeight = window.innerHeight * 0.8
      let newWidth = newHeight * 0.45
      if (newWidth > window.innerWidth) {
        const scale = window.innerWidth / newWidth
        newHeight = newHeight * scale
        newWidth = newWidth * scale
      }
      setWindowSize({ width: newWidth, height: newHeight })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [window.innerHeight, window.innerWidth])
  return (
    <div
      style={{
        width: windowSize.width,
        height: windowSize.height,
      }}
      className="p-4"
    >
      <div className={`w-full h-full relative rounded-lg border-x-4 overflow-hidden border-y-8 border-black`}>
        {children}
      </div>
    </div>
  )
}

export default AppWrapper
