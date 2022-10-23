import { FaRegSmileBeam, FaRegTired } from 'react-icons/fa'
import Icon from '../../modules/icon'
import Modal, { ModalBody, ModalHandler } from '../../modules/modal'
import { round } from '../../utils/round'
import { GalleryItem, GalleryItemProps } from '../home/GalleryItem'
import { ComparisonDashboardPopup } from './ComparisonDashboardPopup'
import { PricePairItem } from './PricePairItem'

export interface SliderItemProps extends GalleryItemProps {
  transactions: any[]
  targetCountry: string
  sourceCountry: string
  hideModal: boolean
  currency?: string
}

export const SliderItem = ({
  sourceCountry,
  targetCountry,
  transactions,
  datasets,
  labels,
  hideModal,
  icon,
  unit,
  value,
  currency = '',
}: SliderItemProps) => {
  if (hideModal) {
    return (
      <div>
        <GalleryItem unit={unit} value={value} icon={icon} labels={labels} datasets={datasets} />
      </div>
    )
  }
  return (
    <Modal blur rounded>
      <ModalHandler>
        <div className="cursor-pointer">
          <GalleryItem unit={unit} value={value} icon={icon} labels={labels} datasets={datasets} />
        </div>
      </ModalHandler>
      <ModalBody title="Transaction history">
        <ComparisonDashboardPopup sourceCountry={sourceCountry} targetCountry={targetCountry}>
          {transactions?.map((tr, index) => (
            <PricePairItem
              currency={currency}
              key={index}
              title={tr.name}
              homePrice={round(-tr.amount)}
              destinationPrice={round(-tr.predicted)}
              icon={<Icon>{tr.amount < tr.predicted ? <FaRegSmileBeam /> : <FaRegTired />}</Icon>}
            />
          ))}
        </ComparisonDashboardPopup>
      </ModalBody>
    </Modal>
  )
}

export default SliderItem
