import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SlideContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const StyledSlider = styled(Slider)`
  .slick-slide {
    transition: all 0.3s ease;
    transform: scale(0.8);
    opacity: 0.5;
    filter: grayscale(100%);
    
    &.slick-center {
      transform: scale(1.2);
      opacity: 1;
      filter: grayscale(0%);
      z-index: 2;
    }
  }

  .slick-prev, .slick-next {
    z-index: 1;
    width: 40px;
    height: 40px;
    
    &:before {
      font-size: 40px;
    }
  }

  .slick-prev {
    left: 25px;
  }

  .slick-next {
    right: 25px;
  }
`;

export const SlideImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    max-height: 300px;
  }
`;

export const SlideWrapper = styled.div`
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`; 