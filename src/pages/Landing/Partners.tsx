import { Carousel } from '@sefailyasoz/react-carousel'
import { ChevronLeftIcon, ChevronRightIcon } from 'nft/components/icons'

const Partners = () => {
  const CarouselData = [
    {
      headerText: null,
      subText: null,
      image: 'https://i.ibb.co/fS66rYR/YFX.png',
    },
    {
      headerText: null,
      subText: null,
      image: 'https://i.ibb.co/MMS46SX/Tarot.png',
    },
    {
      headerText: null,
      subText: null,
      image: 'https://i.ibb.co/BnLJwcY/Overnight.png',
    },
    {
      headerText: null,
      subText: null,
      image: 'https://i.ibb.co/zfnB1LG/lqty.png',
    },
    {
      headerText: null,
      subText: null,
      image: 'https://i.ibb.co/WPgY1mF/liquid-Driver.png',
    },
  ]
  return (
    <Carousel
      data={CarouselData}
      autoPlay={true}
      rightItem={<ChevronRightIcon />}
      leftItem={<ChevronLeftIcon />}
      animationDuration={3000}
      headerTextType="black"
      subTextType="white"
      size="normal"
    />
  )
}
// eslint-disable-next-line import/no-unused-modules
export default Partners
