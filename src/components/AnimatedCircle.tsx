
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
          className={`${sizeClasses[size]} rounded-full bg-background flex items-center justify-center relative z-10`}
        >
          {/* Pulsating effect when listening */}
          {isListening && (
            <div className="absolute inset-0 rounded-full bg-echo-purple/10 animate-pulse-slow"></div>
          )}
          
          {/* Processing indicator */}
          {isProcessing && (
            <div className="w-1/2 h-1/2 border-4 border-t-transparent rounded-full border-echo-teal animate-spin"></div>
          )}
          
          {/* Default state - show nothing */}
          {!isListening && !isProcessing && (
            <div className="w-1/2 h-1/2 rounded-full bg-echo-purple/10 opacity-50"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedCircle;
