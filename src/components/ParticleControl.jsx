import React from 'react';

const ParticleControls = ({ 
  config, 
  onConfigChange, 
  onReset, 
  onExplode, 
  onImageLoad,
  onDownloadImage
}) => {
  const handleSliderChange = (key, value) => {
    onConfigChange({ ...config, [key]: value[0] });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageLoad(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-800 p-5 rounded-lg min-w-[300px]">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-300">
          Particle Gap: <span className="font-bold text-white">{config.particleGap}</span>
        </label>
        <input
          type="range"
          min="2"
          max="10"
          value={config.particleGap}
          onChange={(e) => handleSliderChange('particleGap', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-300">
          Mouse Force: <span className="font-bold text-white">{config.mouseForce}</span>
        </label>
        <input
          type="range"
          min="10"
          max="100"
          value={config.mouseForce}
          onChange={(e) => handleSliderChange('mouseForce', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-300">
          Gravity: <span className="font-bold text-white">{config.gravity}</span>
        </label>
        <input
          type="range"
          min="0.01"
          max="0.2"
          step="0.01"
          value={config.gravity}
          onChange={(e) => handleSliderChange('gravity', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-300">
          Noise: <span className="font-bold text-white">{config.noise}</span>
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={config.noise}
          onChange={(e) => handleSliderChange('noise', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-300">
          Click Strength: <span className="font-bold text-white">{config.clickStrength}</span>
        </label>
        <input
          type="range"
          min="0"
          max="200"
          value={config.clickStrength}
          onChange={(e) => handleSliderChange('clickStrength', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-300">
          Color Filter:
        </label>
        <select
          value={config.filter}
          onChange={(e) => handleSliderChange('filter', e.target.value)}
          className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 text-xs"
        >
          <option value="none">None</option>
          <option value="grayscale">Grayscale</option>
          <option value="sepia">Sepia</option>
          <option value="invert">Invert</option>
        </select>
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-300">
          Particle Shape:
        </label>
        <select
          value={config.particleShape}
          onChange={(e) => handleSliderChange('particleShape', e.target.value)}
          className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 text-xs"
        >
          <option value="square">Square</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-300">
          Hue Rotation: <span className="font-bold text-white">{config.hueRotation}°</span>
        </label>
        <input
          type="range"
          min="0"
          max="360"
          value={config.hueRotation}
          onChange={(e) => handleSliderChange('hueRotation', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="vortexMode"
          checked={config.vortexMode}
          onChange={(e) => onConfigChange({ ...config, vortexMode: e.target.checked })}
          className="w-4 h-4 bg-gray-700 border-gray-600 rounded-lg cursor-pointer"
        />
        <label htmlFor="vortexMode" className="text-sm text-gray-300 cursor-pointer">
          Vortex Mode
        </label>
      </div>
      
      <button 
        onClick={onReset}
        className="px-5 py-2 bg-gray-600 text-white border-none rounded-lg cursor-pointer font-mono text-sm transition-colors duration-300 hover:bg-gray-500 active:bg-gray-400"
      >
        Reset Particles
      </button>
      
      <button 
        onClick={onExplode}
        className="px-5 py-2 bg-gray-600 text-white border-none rounded-lg cursor-pointer font-mono text-sm transition-colors duration-300 hover:bg-gray-500 active:bg-gray-400"
      >
        Explode Effect
      </button>
      
      <button 
        onClick={onDownloadImage}
        className="px-5 py-2 bg-purple-600 text-white border-none rounded-lg cursor-pointer font-mono text-sm transition-colors duration-300 hover:bg-purple-500 active:bg-purple-400"
      >
        Download as Image
      </button>

      <div className="flex flex-col gap-1">
        <label htmlFor="imageLoader" className="text-sm text-gray-300">
          Load Custom Image:
        </label>
        <input
          type="file"
          id="imageLoader"
          accept="image/*"
          onChange={handleFileChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 text-xs file:bg-gray-600 file:text-white file:border-none file:px-3 file:py-1 file:rounded file:cursor-pointer file:mr-3 hover:file:bg-gray-500"
        />
      </div>
      
      <div className="bg-gray-700 p-4 rounded-lg mt-2 text-xs leading-relaxed">
        <strong className="text-blue-400">Instructions:</strong><br />
        • Move mouse over canvas to attract particles<br />
        • Click to create ripple effects<br />
        • Adjust sliders to modify behavior<br />
        • Reset to restore original image
      </div>
    </div>
  );
};

export default ParticleControls;