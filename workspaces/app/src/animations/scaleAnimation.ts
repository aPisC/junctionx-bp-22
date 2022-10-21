const scaleTransition = {
  duration: 0.2,
  delay: 0.1,
  ease: 'linear',
}

export const ScaleAnimation = {
  hidden: {
    scale: 0.5,
    opacity: 0,
    transition: scaleTransition,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: scaleTransition,
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: scaleTransition,
  },
}
