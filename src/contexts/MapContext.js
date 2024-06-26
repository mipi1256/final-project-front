import React, { createContext, useState } from 'react';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [selectedStation, setSelectedStation] =
    useState(null);
  const [mapLevel, setMapLevel] = useState(5); // 기본 맵 레벨 (1 ~ 5)

  return (
    <MapContext.Provider
      value={{
        selectedStation,
        setSelectedStation,
        mapLevel,
        setMapLevel,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
