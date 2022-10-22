import { motion } from 'framer-motion'
import { ReactNode, useContext } from 'react'
import { ScaleAnimation } from '../../animations/scaleAnimation'
import { SliderGalleryStyle } from '../../styles/sliderGallery/SliderGallery'
import { cls } from '../../utils/DesignUtils'
import { IntersectionContext } from '../../utils/hooks/intersectionObserver'
import { objectsToString } from '../../utils/Utils'

export interface SliderGalleryItemProps {
  children?: ReactNode
}

export const SliderGalleryItem = ({ children }: SliderGalleryItemProps) => {
  const { inView } = useContext(IntersectionContext)
  return <motion.div className={cls(`${objectsToString(SliderGalleryStyle.item)}`)}>{children}</motion.div>
}

export default SliderGalleryItem
