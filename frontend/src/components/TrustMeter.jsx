import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';

export default function TrustMeter({ score, verdict }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // 1.2s
    const increment = score / (duration / 16);
    
    if (score === 0) {
        setDisplayScore(0);
        return;
    }
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  // Determine colors based on score
  let colorClass = 'text-success stroke-success'; // default to REAL
  let glowClass = 'shadow-success/20';
  let badgeColor = 'bg-success/10 text-success border-success/20';
  
  if (score < 40) {
    colorClass = 'text-danger stroke-danger';
    glowClass = 'shadow-danger/20';
    badgeColor = 'bg-danger/10 text-danger border-danger/20';
  } else if (score < 70) {
    colorClass = 'text-warning stroke-warning';
    glowClass = 'shadow-warning/20';
    badgeColor = 'bg-warning/10 text-warning border-warning/20';
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center animate-fade-up">
      <div className={cn("relative flex items-center justify-center w-36 h-36 rounded-full shadow-2xl", glowClass)}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r={radius}
            className="stroke-surface fill-transparent"
            strokeWidth="12"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            className={cn("fill-transparent transition-all duration-100 ease-out", colorClass)}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-display font-bold">{displayScore}</span>
        </div>
      </div>
      
      <div className={cn("mt-6 px-6 py-2 rounded-full border border-white/10 font-bold tracking-widest text-sm uppercase transform hover:scale-105 transition-transform", badgeColor)}>
        {verdict}
      </div>
    </div>
  );
}
