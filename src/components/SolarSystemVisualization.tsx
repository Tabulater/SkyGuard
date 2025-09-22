import React, { useEffect, useRef } from 'react';

interface Planet {
  name: string;
  distance: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
}

const SolarSystemVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const planets: Planet[] = [
      { name: 'Mercury', distance: 60, size: 3, color: '#8c7853', speed: 0.04, angle: 0 },
      { name: 'Venus', distance: 80, size: 4, color: '#ffc649', speed: 0.03, angle: 0 },
      { name: 'Earth', distance: 100, size: 5, color: '#6b93d6', speed: 0.02, angle: 0 },
      { name: 'Mars', distance: 130, size: 4, color: '#c1440e', speed: 0.015, angle: 0 },
      { name: 'Jupiter', distance: 180, size: 15, color: '#d8ca9d', speed: 0.008, angle: 0 },
      { name: 'Saturn', distance: 220, size: 12, color: '#fad5a5', speed: 0.006, angle: 0 },
      { name: 'Uranus', distance: 260, size: 8, color: '#4fd0e7', speed: 0.004, angle: 0 },
      { name: 'Neptune', distance: 300, size: 8, color: '#4b70dd', speed: 0.003, angle: 0 }
    ];

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 15, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw sun
      ctx.save();
      ctx.fillStyle = '#ffeb3b';
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#ffeb3b';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw orbital paths and planets
      planets.forEach(planet => {
        // Draw orbital path
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
        ctx.stroke();

        // Update planet position
        planet.angle += planet.speed;

        // Calculate planet position
        const x = centerX + Math.cos(planet.angle) * planet.distance;
        const y = centerY + Math.sin(planet.angle) * planet.distance;

        // Draw planet
        ctx.save();
        ctx.fillStyle = planet.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = planet.color;
        ctx.beginPath();
        ctx.arc(x, y, planet.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw planet name
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(planet.name, x, y + planet.size + 15);

        // Special effects for Saturn (rings)
        if (planet.name === 'Saturn') {
          ctx.strokeStyle = 'rgba(250, 213, 165, 0.6)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, planet.size + 5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, planet.size + 8, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Draw asteroid belt
      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2;
        const distance = 150 + Math.random() * 20;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        ctx.fillStyle = 'rgba(139, 69, 19, 0.6)';
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-700 overflow-hidden h-96">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      <div className="absolute top-4 left-4 text-white">
        <h3 className="text-lg font-bold mb-1">Solar System</h3>
        <p className="text-sm text-gray-400">Real-time planetary positions</p>
      </div>
    </div>
  );
};

export default SolarSystemVisualization;