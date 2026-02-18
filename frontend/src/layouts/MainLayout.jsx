/**
 * Main Layout
 * Clean, centered layout structure
 */

import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components';
import { useEffect, useState, memo } from 'react';

// Animated Grid Background with glowing squares
const AnimatedGrid = memo(() => {
  const [glowingSquares, setGlowingSquares] = useState([]);
  
  useEffect(() => {
    const createGlow = () => {
      // Create multiple squares at once
      const newSquares = Array.from({ length: 3 }, () => ({
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 50 + Math.random() * 50,
        duration: 1 + Math.random() * 1.5,
      }));
      
      setGlowingSquares(prev => [...prev.slice(-20), ...newSquares]);
      
      newSquares.forEach(square => {
        setTimeout(() => {
          setGlowingSquares(prev => prev.filter(s => s.id !== square.id));
        }, square.duration * 1000);
      });
    };
    
    createGlow();
    const interval = setInterval(createGlow, 400);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Glowing Squares */}
      {glowingSquares.map(square => (
        <div
          key={square.id}
          className="absolute rounded-sm animate-pulse"
          style={{
            left: `${square.left}%`,
            top: `${square.top}%`,
            width: `${square.size}px`,
            height: `${square.size}px`,
            background: 'linear-gradient(135deg, rgba(255,215,0,0.25), rgba(0,191,255,0.15))',
            boxShadow: '0 0 30px rgba(255,215,0,0.5), inset 0 0 15px rgba(255,215,0,0.2)',
            animationDuration: `${square.duration}s`,
          }}
        />
      ))}
    </>
  );
});

AnimatedGrid.displayName = 'AnimatedGrid';

// Falling Coins Effect
const FallingCoins = memo(() => {
  const [coins, setCoins] = useState([]);
  
  useEffect(() => {
    const createCoin = () => {
      const id = Date.now() + Math.random();
      const coin = {
        id,
        left: Math.random() * 100,
        size: 12 + Math.random() * 16,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 2,
        rotation: Math.random() * 360,
      };
      
      setCoins(prev => [...prev.slice(-15), coin]);
      
      setTimeout(() => {
        setCoins(prev => prev.filter(c => c.id !== id));
      }, (coin.duration + coin.delay) * 1000);
    };
    
    // Initial coins
    for (let i = 0; i < 5; i++) {
      setTimeout(createCoin, i * 300);
    }
    
    const interval = setInterval(createCoin, 600);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      {coins.map(coin => (
        <div
          key={coin.id}
          className="absolute"
          style={{
            left: `${coin.left}%`,
            top: '-30px',
            width: `${coin.size}px`,
            height: `${coin.size}px`,
            animation: `fall ${coin.duration}s linear ${coin.delay}s forwards, spin ${coin.duration / 2}s linear infinite`,
          }}
        >
          <div 
            className="w-full h-full rounded-full bg-gradient-to-br from-gold via-yellow-300 to-gold-dark border-2 border-gold-light shadow-[0_0_10px_rgba(255,215,0,0.6)]"
            style={{ transform: `rotate(${coin.rotation}deg)` }}
          >
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gold-light/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-gold-dark font-bold" style={{ fontSize: `${coin.size * 0.5}px` }}>
              $
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

FallingCoins.displayName = 'FallingCoins';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 bg-fixed relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-[100px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-cyan/5 rounded-full blur-[80px] animate-[float_10s_ease-in-out_infinite_2s]" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-gold/5 rounded-full blur-[90px] animate-[float_9s_ease-in-out_infinite_1s]" />
        {/* Logo Watermark Global */}
<img
  src="/logo.png"
  alt=""
  className="
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-[1200px]
    opacity-[0.33]
    select-none
    pointer-events-none
  "
/>

        {/* Animated Grid */}
        <AnimatedGrid />
        
        {/* Falling Coins */}
        <FallingCoins />
      </div>
      
      <Navbar />
      <main className="flex-1 w-full flex justify-center relative z-10">
       <div className="w-full max-w-[1600px] px-6 md:px-8 lg:px-12">

          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;