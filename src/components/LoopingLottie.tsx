import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animation1 from '../public/2.json';
import animation2 from '../public/3.json';
import animation3 from '../public/44.json';
import animation4 from '../public/4.json';
import animation5 from '../public/5.json';
import './LoopingLottie.css';

const LoopingLottie: React.FC = () => {
  // 👇 Replace with actual dark mode detection logic
  const isDarkMode = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const animations = isDarkMode
    ? [animation3, animation4, animation2] // without animation1
    : [animation1, animation3, animation4, animation2, animation5];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(false); // start fade out

      const next = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % animations.length);
        setFade(true); // start fade in
      }, 1000);

      return () => clearTimeout(next);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex, animations.length]);

  return (
    <div className="responsive-container">
      <div className={`lottie-container ${fade ? 'fade-in' : 'fade-out'}`}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animations[currentIndex]}
          loop={false}
          className="responsive-lottie bg-transparent text-white"
        />
      </div>
    </div>
  );
};

export default LoopingLottie;
