import { FaRegSmileBeam } from 'react-icons/fa'
import Icon from '../../modules/icon'
import Modal, { ModalBody, ModalHandler } from '../../modules/modal'
import { GalleryItem, GalleryItemProps } from '../home/GalleryItem'
import { ComparisonDashboardPopup } from './ComparisonDashboardPopup'
import { PricePairItem } from './PricePairItem'

export interface SliderItemProps extends GalleryItemProps {}

export const SliderItem = ({ datasets, labels, icon }: SliderItemProps) => {
  return (
    <Modal blur rounded>
      <ModalHandler>
        <div className="cursor-pointer">
          <GalleryItem icon={icon} labels={labels} datasets={datasets} />
        </div>
      </ModalHandler>
      <ModalBody title="Category">
        <ComparisonDashboardPopup>
          {Array.from(Array(7)).map((item, index) => (
            <PricePairItem
              key={index}
              homePrice={500}
              icon={
                <Icon>
                  <FaRegSmileBeam />
                </Icon>
              }
              destinationPrice={1200}
            />
          ))}
        </ComparisonDashboardPopup>
      </ModalBody>
    </Modal>
  )
}

export default SliderItem
