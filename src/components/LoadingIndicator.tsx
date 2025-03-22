
import React from 'react';
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingIndicator = ({ 
  className, 
  size = 'md', 
  text = 'Loading...' 
}: LoadingIndicatorProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div
        className={cn(
          "rounded-full border-blue-300/30 border-t-blue-500 animate-spin", 
          sizeClasses[size]
        )}
      />
      {text && (
        <p className="text-sm text-blue-600/70 dark:text-blue-400/80 animate-pulse-opacity">{text}</p>
      )}
    </div>
  );
};

export default LoadingIndicator;
