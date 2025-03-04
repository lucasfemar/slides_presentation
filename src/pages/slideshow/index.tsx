import React, { useEffect, useState } from "react";
import type { Settings } from "react-slick";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SlideFooter } from "src/components/slidefooter";

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

  @media (orientation: portrait) {
    padding: 0;
  }
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

    @media (orientation: portrait) {
      transform: scale(1);
      opacity: 1;

      &.slick-current {
        transform: scale(1);
      }

      &.slick-active {
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
    width: 50px;
    height: 50px;

    &:before {
      font-size: 50px;
      opacity: 0.05;
    }

    @media (orientation: portrait) {
      display: none !important;
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
    z-index: 20;

    li button:before {
      font-size: 12px;
      color: white;
    }
  }

  @media (orientation: portrait) {
    .slick-list {
      overflow: hidden;
    }
  }
`;

const SlideImage = styled.div<{ src: string }>`
  width: 75vw;
  height: 90vh;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  @media (max-width: 1024px) {
    width: 85vw;
    height: 80vh;
  }

  @media (orientation: portrait) {
    width: 100vw;
    height: 100vh;
    background-size: contain;
    margin: 0;
    padding: 0;
    left: 0;
    transform: none;
  }
`;

export default function SlideShow() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPortrait, setIsPortrait] = useState(false);
  const sliderRef = React.useRef<Slider>(null);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    };

    const handleFullScreenChange = () => {
      // Reinicia o autoplay quando mudar o modo de tela
      if (sliderRef.current) {
        sliderRef.current.slickPlay();
      }
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange,
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange,
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange,
      );
    };
  }, []);

  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch("/api/v1/images");
        if (!response.ok) {
          throw new Error("Falha ao carregar imagens");
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error("Erro:", err);
        setError(
          err instanceof Error ? err.message : "Erro ao carregar imagens",
        );
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  const settings: Settings = {
    dots: !isPortrait,
    infinite: true,
    speed: 500,
    slidesToShow: isPortrait ? 1 : 3,
    slidesToScroll: 1,
    centerMode: !isPortrait,
    centerPadding: "0",
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
          centerMode: false,
          dots: !isPortrait,
        },
      },
    ],
  };

  if (loading) {
    return (
      <SlideContainer>
        <div style={{ color: "white" }}>Carregando...</div>
      </SlideContainer>
    );
  }

  if (error) {
    return (
      <SlideContainer>
        <div style={{ color: "white" }}>Erro: {error}</div>
      </SlideContainer>
    );
  }

  return (
    <SlideContainer>
      <StyledSlider ref={sliderRef} {...settings}>
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
