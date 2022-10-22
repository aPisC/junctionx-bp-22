import { FaRegSmileBeam, FaUtensils } from 'react-icons/fa'
import Card, { BaseCard, ExpandedCard } from '../../modules/card'
import Icon from '../../modules/icon'
import { BarChartView } from '../home/BarChartView'
import { GalleryItem } from '../home/GalleryItem'
import { ComparisonDashboardPopup } from './ComparisonDashboardPopup'
import { PricePairItem } from './PricePairItem'

export interface SliderItemProps {}

export const SliderItem = ({}: SliderItemProps) => {
  return (
    <Card rounded>
      <BaseCard layoutId="card-0">
        <GalleryItem
          icon={<FaUtensils />}
          labels={['Food']}
          datasets={[
            {
              label: 'Home',
              data: [100],
              barThickness: 10,
              borderRadius: 8,
              backgroundColor: '#37517e',
            },
            {
              label: 'Ex.',
              data: [350],
              barThickness: 10,
              borderRadius: 8,
              backgroundColor: '#A8AAAC',
            },
          ]}
        />
      </BaseCard>
      <ExpandedCard layoutId="card-0">
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
      </ExpandedCard>
    </Card>
  )
}

export default SliderItem
