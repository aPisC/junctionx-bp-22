import { motion } from 'framer-motion'
import { Children, ReactNode, useEffect, useRef, useState } from 'react'
import { SliderGalleryStyle } from '../../styles/sliderGallery/SliderGallery'
import { cls } from '../../utils/DesignUtils'
import { IntersectionObserver } from '../../utils/hooks/intersectionObserver'
import { objectsToString } from '../../utils/Utils'
import { SliderGalleryItemProps, SliderGalleryItem } from './SliderGalleryItem'

export interface SliderGalleryProps {
  children: ReactNode
}

export const SliderGallery = ({ children }: SliderGalleryProps) => {
  const [width, setWidth] = useState(0)

  const carousel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!carousel.current) {
      return
    }
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
  }, [carousel, width])
  return (
    <motion.div ref={carousel} className={cls(`${objectsToString(SliderGalleryStyle.container.outer)}`)}>
      <motion.div
        drag="x"
        whileTap={{ cursor: 'grabbing' }}
        dragConstraints={{
          right: 0,
          left: -width,
        }}
        className={cls(`${objectsToString(SliderGalleryStyle.container.inner)}`)}
      >
        {Children.map(children, (child) => (
          <IntersectionObserver reset>{child}</IntersectionObserver>
        ))}
      </motion.div>
    </motion.div>
  )
}

export type { SliderGalleryItemProps }
export { SliderGalleryItem, SliderGalleryStyle }
export default SliderGallery
