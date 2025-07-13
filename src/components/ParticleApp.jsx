import React, { useState, useCallback, useRef } from 'react';
import ParticleCanvas from './ParticleCanvas';
import ParticleControls from './ParticleControl';
import { downloadCanvasAsImage } from '../utils/recorder';

const ParticleApp = () => {
  // Default configuration
  const [config, setConfig] = useState({
    particleGap: 4,
    mouseForce: 30,
    gravity: 0.08,
    noise: 10,
    clickStrength: 100,
    filter: 'none',
    particleShape: 'square',
    hueRotation: 0,
    vortexMode: false
  });

  // Default image URL
  const [imageUrl, setImageUrl] = useState(
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjY2NmZmO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMzMzNjYztzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDk5O3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgCiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+CiAgCiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI0MCIgZmlsbD0iI2ZmNjY2NiIgb3BhY2l0eT0iMC44Ii8+CiAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMTAwIiByPSI0MCIgZmlsbD0iIzY2ZmY2NiIgb3BhY2l0eT0iMC44Ii8+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSI2MCIgZmlsbD0iI2ZmZmY2NiIgb3BhY2l0eT0iMC44Ii8+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMzAwIiByPSI0MCIgZmlsbD0iI2ZmNjZmZiIgb3BhY2l0eT0iMC44Ii8+CiAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMzAwIiByPSI0MCIgZmlsbD0iIzY2ZmZmZiIgb3BhY2l0eT0iMC44Ii8+CiAgCiAgPHRleHQgeD0iMjAwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UEFSVElDTEU8L3RleHQ+CiAgPHRleHQgeD0iMjAwIiB5PSIzNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVGRkVDVDwvdGV4dD4KPC9zdmc+'
  );

  // Triggers for actions
  const [resetTrigger, setResetTrigger] = useState(0);
  const [explodeTrigger, setExplodeTrigger] = useState(0);
  const canvasRef = useRef(null);

  // Particle system info
  const [particleInfo, setParticleInfo] = useState({
    particleCount: 0,
    speed: 1,
    gravityFactor: 0.92
  });

  // Handlers
  const handleConfigChange = useCallback((newConfig) => {
    setConfig(newConfig);
  }, []);

  const handleReset = useCallback(() => {
    setResetTrigger(prev => prev + 1);
  }, []);

  const handleExplode = useCallback(() => {
    setExplodeTrigger(prev => prev + 1);
  }, []);

  const handleImageLoad = useCallback((newImageUrl) => {
    setImageUrl(newImageUrl);
  }, []);

  const handleParticlesInit = useCallback((info) => {
    setParticleInfo(info);
  }, []);

  const handleDownloadImage = useCallback(() => {
    if (canvasRef.current) {
      downloadCanvasAsImage(canvasRef.current);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono p-5 flex flex-col items-center">
      <div className="max-w-2xl text-center mb-8 leading-relaxed">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
          Particle Disintegration Effect
        </h1>
        <p className="text-gray-300">
          An image particle system that converts pixels into interactive particles. 
          Move your mouse over the canvas to attract particles, click to create ripple effects.
        </p>
        {particleInfo.particleCount > 0 && (
          <div className="text-xs text-gray-400 mt-3 font-mono">
            Particles: {particleInfo.particleCount} | Speed: {particleInfo.speed.toFixed(2)} | 
            Gravity Factor: {particleInfo.gravityFactor.toFixed(3)}
          </div>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center flex-wrap">
        <ParticleCanvas
          config={config}
          imageUrl={imageUrl}
          resetTrigger={resetTrigger}
          explodeTrigger={explodeTrigger}
          onParticlesInit={handleParticlesInit}
          canvasRef={canvasRef}
        />
        
        <ParticleControls
          config={config}
          onConfigChange={handleConfigChange}
          onReset={handleReset}
          onExplode={handleExplode}
          onImageLoad={handleImageLoad}
          onDownloadImage={handleDownloadImage}
        />
      </div>
    </div>
  );
};

export default ParticleApp;