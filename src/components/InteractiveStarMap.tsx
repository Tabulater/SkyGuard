import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface Constellation {
  name: string;
  stars: Array<{ x: number; y: number; brightness: number }>;
  connections: Array<[number, number]>;
}

const InteractiveStarMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredConstellation, setHoveredConstellation] = useState<string | null>(null);

  const constellations: Constellation[] = [
    {
      name: 'Orion',
      stars: [
        { x: 0.3, y: 0.2, brightness: 0.9 },
        { x: 0.35, y: 0.25, brightness: 0.8 },
        { x: 0.4, y: 0.3, brightness: 0.7 },
        { x: 0.32, y: 0.4, brightness: 0.8 },
        { x: 0.38, y: 0.45, brightness: 0.9 },
        { x: 0.42, y: 0.5, brightness: 0.7 },
        { x: 0.28, y: 0.6, brightness: 0.8 }
      ],
      connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [1, 4]]
    },
    {
      name: 'Ursa Major',
      stars: [
        { x: 0.6, y: 0.3, brightness: 0.8 },
        { x: 0.65, y: 0.32, brightness: 0.7 },
        { x: 0.7, y: 0.35, brightness: 0.9 },
        { x: 0.75, y: 0.38, brightness: 0.8 },
        { x: 0.72, y: 0.45, brightness: 0.7 },
        { x: 0.68, y: 0.48, brightness: 0.8 },
        { x: 0.63, y: 0.45, brightness: 0.9 }
      ],
      connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]]
    }
  ];

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

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background stars
      for (let i = 0; i < 200; i++) {
        const x = (i * 137.5) % canvas.width;
        const y = (i * 197.3) % canvas.height;
        const brightness = Math.sin(time * 0.01 + i) * 0.3 + 0.7;
        
        ctx.save();
        ctx.globalAlpha = brightness * 0.6;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw constellations
      constellations.forEach(constellation => {
        const isHovered = hoveredConstellation === constellation.name;
        
        // Draw connections
        ctx.strokeStyle = isHovered ? '#60a5fa' : '#4b5563';
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.globalAlpha = isHovered ? 0.8 : 0.4;
        
        constellation.connections.forEach(([start, end]) => {
          const startStar = constellation.stars[start];
          const endStar = constellation.stars[end];
          
          ctx.beginPath();
          ctx.moveTo(startStar.x * canvas.width, startStar.y * canvas.height);
          ctx.lineTo(endStar.x * canvas.width, endStar.y * canvas.height);
          ctx.stroke();
        });

        // Draw stars
        constellation.stars.forEach((star, index) => {
          const x = star.x * canvas.width;
          const y = star.y * canvas.height;
          const twinkle = Math.sin(time * 0.02 + index) * 0.3 + 0.7;
          const size = star.brightness * (isHovered ? 4 : 3) * twinkle;
          
          ctx.save();
          ctx.globalAlpha = star.brightness * twinkle;
          ctx.fillStyle = isHovered ? '#60a5fa' : '#ffffff';
          ctx.shadowBlur = isHovered ? 15 : 10;
          ctx.shadowColor = isHovered ? '#60a5fa' : '#ffffff';
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Draw constellation name
        if (isHovered) {
          const centerX = constellation.stars.reduce((sum, star) => sum + star.x, 0) / constellation.stars.length * canvas.width;
          const centerY = constellation.stars.reduce((sum, star) => sum + star.y, 0) / constellation.stars.length * canvas.height;
          
          ctx.save();
          ctx.fillStyle = '#60a5fa';
          ctx.font = '16px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(constellation.name, centerX, centerY - 20);
          ctx.restore();
        }
      });

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / canvas.width;
      const y = (e.clientY - rect.top) / canvas.height;
      
      let foundConstellation = null;
      
      constellations.forEach(constellation => {
        constellation.stars.forEach(star => {
          const distance = Math.sqrt((x - star.x) ** 2 + (y - star.y) ** 2);
          if (distance < 0.05) {
            foundConstellation = constellation.name;
          }
        });
      });
      
      setHoveredConstellation(foundConstellation);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [hoveredConstellation]);

  return (
    <div className={`relative bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-700 overflow-hidden ${
      isFullscreen ? 'fixed inset-0 z-50' : 'h-96'
    }`}>
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-lg transition-all"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>
      
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
      />
      
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg font-bold mb-2">Interactive Star Map</h3>
        <p className="text-sm text-gray-400">Hover over stars to explore constellations</p>
        {hoveredConstellation && (
          <p className="text-sm text-blue-400 mt-1">Viewing: {hoveredConstellation}</p>
        )}
      </div>
    </div>
  );
};

export default InteractiveStarMap;