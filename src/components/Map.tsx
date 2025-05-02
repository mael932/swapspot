
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  city: string;
  randomize?: boolean;
}

const Map = ({ city, randomize = true }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, use a public token
    // In production, this should be stored securely
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNsdmk4dDRnYTA5aGUyc29kO DQxM2E1eHEifQ.ohorbZuc9o6pktQ7mIpJNA';
    
    // Generate slightly randomized coordinates based on city
    // These are approximate coordinates for demo purposes
    const cityCoordinates: {[key: string]: [number, number]} = {
      'Paris, France': [2.3522, 48.8566],
      'Madrid, Spain': [-3.7038, 40.4168],
      'Barcelona, Spain': [2.1734, 41.3851],
      'Berlin, Germany': [13.4050, 52.5200],
      'Copenhagen, Denmark': [12.5683, 55.6761],
      'Warsaw, Poland': [21.0122, 52.2297],
      'Munich, Germany': [11.5820, 48.1351],
      'Vienna, Austria': [16.3738, 48.2082],
      'Geneva, Switzerland': [6.1432, 46.2044],
      'London, UK': [-0.1278, 51.5074],
      'Amsterdam, Netherlands': [4.9041, 52.3676]
    };
    
    // Default to London if city isn't found
    let [lng, lat] = cityCoordinates[city] || [13.4050, 52.5200];
    
    // Add small random variation if randomize is true
    if (randomize) {
      lng += (Math.random() - 0.5) * 0.02;
      lat += (Math.random() - 0.5) * 0.02;
    }
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 13
    });
    
    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add a marker at the location
    new mapboxgl.Marker({ color: '#683bfa' })
      .setLngLat([lng, lat])
      .addTo(map.current);

    // Cleanup on unmount
    return () => {
      map.current?.remove();
    };
  }, [city, randomize]);

  return (
    <div ref={mapContainer} className="w-full h-full rounded-lg" />
  );
};

export default Map;
