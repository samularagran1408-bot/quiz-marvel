import { useState, useEffect } from 'react';
import { marvelTimeline } from '../data/marvelData';

export const useMarvelData = () => {
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);

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