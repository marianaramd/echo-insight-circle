
import React, { useState, useEffect } from "react";

interface AnimatedCircleProps {
  isListening?: boolean;
  isProcessing?: boolean;
  size?: "sm" | "md" | "lg";
}

const AnimatedCircle: React.FC<AnimatedCircleProps> = ({
  isListening = false,
  isProcessing = false,
  size = "lg",
}) => {
  const [rotation, setRotation] = useState(0);
  const [pulseSize, setPulseSize] = useState(0);

  // Sizes for different circle variants
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-64 h-64",
  };

  // Update rotation for the gradient effect
  useEffect(() => {
    let animationFrame: number;
    let lastTime = 0;
    
    const updateRotation = (time: number) => {
      if (lastTime === 0) {
        lastTime = time;
      }
      
      const delta = time - lastTime;
      setRotation((prevRotation) => (prevRotation + delta * 0.01) % 360);
      lastTime = time;
      
      animationFrame = requestAnimationFrame(updateRotation);
    };
    
    if (isListening || isProcessing) {
      animationFrame = requestAnimationFrame(updateRotation);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isListening, isProcessing]);
  
  // Pulsating effect when listening
  useEffect(() => {
    let pulsateInterval: number;
    
    if (isListening) {
      pulsateInterval = window.setInterval(() => {
        setPulseSize((prev) => (prev + 1) % 20); // Oscillate between 0 and 19
      }, 100);
    }
    
    return () => {
      if (pulsateInterval) {
        clearInterval(pulsateInterval);
      }
      setPulseSize(0);
    };
  }, [isListening]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer gradient ring */}
      <div
        className={`listening-circle ${sizeClasses[size]}`}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* Inner circle */}
        <div
          className={`${sizeClasses[size]} rounded-full bg-white shadow-md flex items-center justify-center relative z-10`}
        >
          {/* Pulsating effect when listening */}
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full bg-purple-500/10 animate-pulse-slow"></div>
              <div 
                className={`w-1/2 h-1/2 rounded-full bg-purple-500/20`}
                style={{
                  transform: `scale(${0.8 + pulseSize * 0.01})`,
                  transition: 'transform 0.1s ease-in-out'
                }}
              ></div>
            </>
          )}
          
          {/* Processing indicator */}
          {isProcessing && (
            <div className="w-1/2 h-1/2 border-4 border-t-transparent rounded-full border-teal-500 animate-spin"></div>
          )}
          
          {/* Default state - show nothing */}
          {!isListening && !isProcessing && (
            <div className="w-1/2 h-1/2 rounded-full bg-purple-500/10 opacity-50"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedCircle;
