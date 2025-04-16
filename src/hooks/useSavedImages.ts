
import { useState, useEffect } from 'react';

interface SavedImage {
  id: string;
  image: string;
  timestamp: number;
}

export const useSavedImages = () => {
  const [savedImages, setSavedImages] = useState<SavedImage[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('savedImages');
    if (stored) {
      setSavedImages(JSON.parse(stored));
    }
  }, []);

  const saveImage = (image: string) => {
    const newImage: SavedImage = {
      id: Math.random().toString(36).substring(7),
      image,
      timestamp: Date.now()
    };
    
    const updatedImages = [...savedImages, newImage];
    setSavedImages(updatedImages);
    localStorage.setItem('savedImages', JSON.stringify(updatedImages));
    return newImage.id;
  };

  return { savedImages, saveImage };
};
