import React, { useEffect, useState } from 'react';
import type { Settings } from 'react-slick';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlideFooter } from '../../components/slidefooter';

interface ImageType {
  src: string;
  alt: string;
}

const SlideContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0 0 35px 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px;
  
  .slick-list {
    overflow: visible;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    transition: all 0.5s ease;
    transform: scale(0.7);
    opacity: 0.5;
    
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    &.slick-current {
      transform: scale(1);
      opacity: 1;
      z-index: 10;
    }

    &.slick-active {
      &:first-child {
        margin-left: -25%;
      }
    }
  }

  .slick-prev, .slick-next {
    z-index: 1;
    width: 50px;
    height: 50px;
    
    &:before {
      font-size: 50px;
      opacity: 0.05;
    }
  }

  .slick-prev {
    left: 5%;
  }

  .slick-next {
    right: 5%;
  }

  .slick-dots {
    bottom: 20px;
    
    li button:before {
      font-size: 12px;
      color: white;
    }
  }
`;

const SlideImage = styled.div<{ src: string }>`
  width: 75vw;
  height: 90vh;
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 1024px) {
    width: 85vw;
    height: 80vh;
  }

  @media (max-width: 768px) {
    width: 98vw;
    height: 70vh;
  }
`;

export default function SlideShow() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch('/api/v1/images');
        if (!response.ok) {
          throw new Error('Falha ao carregar imagens');
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error('Erro:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar imagens');
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '0',
        }
      }
    ]
  };

  if (loading) {
    return (
      <SlideContainer>
        <div style={{ color: 'white' }}>Carregando...</div>
      </SlideContainer>
    );
  }

  if (error) {
    return (
      <SlideContainer>
        <div style={{ color: 'white' }}>Erro: {error}</div>
      </SlideContainer>
    );
  }

  return (
    <SlideContainer>
      <StyledSlider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <SlideImage src={image.src} />
          </div>
        ))}
      </StyledSlider>
      <SlideFooter />
    </SlideContainer>
  );
} 