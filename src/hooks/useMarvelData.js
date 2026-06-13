import { useState, useEffect } from 'react';
import { marvelTimeline } from '../data/marvelData';

export const useMarvelData = () => {
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);

  /**
   * Utilizado para cargar los datos del timeline de películas del Universo Cinematográfico de Marvel (MCU) en segundo plano.
   * El estado loading se utiliza para mostrar un indicador de carga mientras se está cargando los datos.
   */
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setTimeline(marvelTimeline);
      setLoading(false);
    };
    loadData();
  }, []);

  return { loading, timeline };
};