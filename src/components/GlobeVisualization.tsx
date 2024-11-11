import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import * as d3 from 'd3';

interface Point {
  lat: number;
  lng: number;
  size: number;
  color: string;
  label: string;
}

const generateRandomPoints = (count: number): Point[] => {
  return Array.from({ length: count }, () => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random() * 20 + 5,
    color: d3.interpolateInferno(Math.random()),
    label: `User ${Math.floor(Math.random() * 1000)}`
  }));
};

export default function GlobeVisualization() {
  const globeRef = useRef<any>();
  const [points, setPoints] = useState<Point[]>([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initial points
    setPoints(generateRandomPoints(50));

    // Auto-rotation
    const autoRotate = setInterval(() => {
      setRotation(prev => ({
        x: prev.x,
        y: prev.y + 0.2
      }));
    }, 30);

    // Add new points periodically
    const addPoints = setInterval(() => {
      setPoints(prev => [...prev.slice(-45), ...generateRandomPoints(5)]);
    }, 3000);

    return () => {
      clearInterval(autoRotate);
      clearInterval(addPoints);
    };
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: rotation.x, lng: rotation.y, altitude: 2.5 });
    }
  }, [rotation]);

  return (
    <div className="h-[600px] relative">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0}
        pointRadius="size"
        pointLabel="label"
        pointsMerge={true}
        atmosphereColor="#6366f1"
        atmosphereAltitude={0.1}
        width={800}
        height={600}
      />
      <div className="absolute bottom-4 left-4 bg-zinc-900/90 backdrop-blur-sm p-4 rounded-xl border border-zinc-800">
        <h3 className="text-sm font-medium mb-2">Live User Activity</h3>
        <p className="text-xs text-zinc-400">
          {points.length} active users worldwide
        </p>
      </div>
    </div>
  );
}