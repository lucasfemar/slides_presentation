import { Box, Typography, IconButton } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styled from 'styled-components';
import { informativePhrases } from 'src/config/phrases';
import { useEffect, useState } from 'react';
import { useWeather } from 'src/hooks/useWeather';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';

// Adicionando estilos globais para as fontes
const GlobalStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
`;

const AnimatedText = styled(Typography)`
  @keyframes slideIn {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    10% {
      transform: translateX(0);
      opacity: 1;
    }
    90% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  animation: slideIn 20s linear infinite;
  white-space: nowrap;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
`;

const Divider = () => (
  <Typography sx={{ 
    px: 2, 
    color: 'white',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    opacity: 0.4,
    fontFamily: 'Montserrat, sans-serif'
  }}>|</Typography>
);

export const SlideFooter = () => {
  const { weather, loading } = useWeather();
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm:ss', { locale: ptBR }));
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), 'HH:mm:ss', { locale: ptBR }));
    }, 1000); // Atualiza a cada segundo

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => 
        prevIndex === informativePhrases.length - 1 ? 0 : prevIndex + 1
      );
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GlobalStyle>
      <Box
        sx={{
          position: 'fixed',
          bottom: '8px',
          left: '10px',
          right: '10px',
          height: '40px',
          backgroundColor: 'rgba(48, 47, 47, 0.5)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          fontFamily: 'Montserrat, sans-serif'
        }}
      >
        <Box sx={{ flex: '0 0 200px' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'white',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              whiteSpace: 'nowrap',  // Força ficar em uma linha
              overflow: 'hidden',     // Esconde overflow
              textOverflow: 'ellipsis', // Adiciona ... se necessário
              fontSize: '0.9rem'      // Reduz um pouco o tamanho da fonte
            }}
          >
            {loading ? (
              'Carregando...'
            ) : weather ? (
              `${weather.temp}°C - ${weather.description}`
            ) : (
              'Previsão indisponível'
            )}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ flex: 1, textAlign: 'center', overflow: 'hidden' }}>
          <AnimatedText sx={{ color: 'white' }} key={currentPhraseIndex}>
            {informativePhrases[currentPhraseIndex]}
          </AnimatedText>
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: '100px', height: '40px' }}>
            <img 
              src="../images/logos/logo-ibpv.png"
              alt="Logo IBPV"
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              size="small" 
              sx={{ 
                color: '#FF0000',
                '&:hover': { color: '#E1306C' }
              }}
              onClick={() => window.open('https://www.instagram.com/ibpedraviva', '_blank')}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>

            <IconButton 
              size="small" 
              sx={{ 
                color: '#FF0000',
                '&:hover': { color: '#FF0000' }
              }}
              onClick={() => window.open('https://www.youtube.com/@ibpedraviva', '_blank')}
            >
              <YouTubeIcon fontSize="small" />
            </IconButton>

            <IconButton 
              size="small" 
              sx={{ 
                color: '#4267B2',
                '&:hover': { color: '#4267B2' }
              }}
              onClick={() => window.open('https://www.facebook.com/IBPedraViva/', '_blank')}
            >
              <FacebookIcon fontSize="small" />
            </IconButton>
          </Box>

          <Divider />

          <Typography variant="h6" sx={{ 
            minWidth: '80px', 
            textAlign: 'right', 
            color: 'white',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600
          }}>
            {currentTime}
          </Typography>
        </Box>
      </Box>
    </GlobalStyle>
  );
};