import React, { useEffect, useRef } from 'react';

const MeteorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const meteors: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      trail: Array<{ x: number; y: number; opacity: number }>;
      life: number;
    }> = [];

    const createMeteor = () => {
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;

      switch (side) {
        case 0: // Top
          x = Math.random() * canvas.width;
          y = -50;
          vx = (Math.random() - 0.5) * 4;
          vy = Math.random() * 3 + 2;
          break;
        case 1: // Right
          x = canvas.width + 50;
          y = Math.random() * canvas.height;
          vx = -(Math.random() * 3 + 2);
          vy = (Math.random() - 0.5) * 4;
          break;
        case 2: // Bottom
          x = Math.random() * canvas.width;
          y = canvas.height + 50;
          vx = (Math.random() - 0.5) * 4;
          vy = -(Math.random() * 3 + 2);
          break;
        default: // Left
          x = -50;
          y = Math.random() * canvas.height;
          vx = Math.random() * 3 + 2;
          vy = (Math.random() - 0.5) * 4;
      }

      meteors.push({
        x,
        y,
        vx,
        vy,
        size: Math.random() * 3 + 1,
        trail: [],
        life: 100
      });
    };

    let animationId: number;
    let lastMeteorTime = 0;

    const animate = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new meteors occasionally
      if (currentTime - lastMeteorTime > 3000 + Math.random() * 5000) {
        createMeteor();
        lastMeteorTime = currentTime;
      }

      meteors.forEach((meteor, index) => {
        // Add current position to trail
        meteor.trail.push({ x: meteor.x, y: meteor.y, opacity: 1 });
        if (meteor.trail.length > 20) {
          meteor.trail.shift();
        }

        // Update position
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.life--;

        // Draw trail
        meteor.trail.forEach((point, trailIndex) => {
          const opacity = (trailIndex / meteor.trail.length) * point.opacity * 0.8;
          const size = meteor.size * (trailIndex / meteor.trail.length);
          
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.fillStyle = '#60a5fa';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#60a5fa';
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Draw meteor head
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#60a5fa';
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Remove meteor if it's off screen or life is over
        if (meteor.life <= 0 || 
            meteor.x < -100 || meteor.x > canvas.width + 100 ||
            meteor.y < -100 || meteor.y > canvas.height + 100) {
          meteors.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-5"
    />
  );
};

export default MeteorTrail;