import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css'

const SlickCarousel = ({children, speed, sm, md, lg, xl, fade}) => {

  return (
    <div className='slick-carousel'>
            <Slider responsive= { [
                {
                breakpoint: 460,
                settings: {
                    fade: fade ? true : false,
                    speed: 500,
                    slidesToShow: sm,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: speed,
                    arrows: false
                }
                },
                {
                breakpoint: 768,
                settings: {
                    fade: fade ? true : false,
                    speed: 500,
                    slidesToShow: md,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: speed,
                }
                },
                {
                breakpoint: 1200,
                settings: {
                    fade: fade ? true : false,
                    speed: 500,
                    slidesToShow: lg,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: speed,
                }
                },
                {
                breakpoint: 1600,
                settings: {
                    fade: fade ? true : false,
                    speed: 500,
                    slidesToShow: xl,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: speed,
                }
                }
            ]}>
              {children}
            </Slider>
    </div>
  );
};

export default SlickCarousel;