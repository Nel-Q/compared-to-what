import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibmVsLXEiLCJhIjoiY2xndG53dmhhMDg0ajNwbGppNmY0bjFuOCJ9.JWkSnsAFTFPkYypRMbkaLw';

function Map() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2,
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div className="map" ref={mapContainer} />;
}

export default Map;
