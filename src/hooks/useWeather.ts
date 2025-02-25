import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  description: string;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Coordenadas de Recife
        const lat = -8.0476;
        const lon = -34.8770;
        const API_KEY = 'a79abd7ec1922c7daf1f3df13b1e1ec1'; // Você precisará de uma API key do OpenWeatherMap
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`
        );
        const data = await response.json();
        
        setWeather({
          temp: Math.round(data.main.temp),
          description: data.weather[0].description
        });
      } catch (error) {
        console.error('Erro ao buscar dados do tempo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Atualiza a cada 10 minutos

    return () => clearInterval(interval);
  }, []);

  return { weather, loading };
}; 