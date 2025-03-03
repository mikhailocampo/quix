import { forwardRef, useState } from 'react';
import { FlierConfig } from '../lib/types';
import { Progress } from './ui/progress';
import { cn } from '../lib/utils';

interface CalendarPreviewProps {
  config: FlierConfig;
}

export const CalendarPreview = forwardRef<HTMLDivElement, CalendarPreviewProps>(
  ({ config }, ref) => {
    const progressPercentage = Math.min(
      100,
      (config.progress.current / config.progress.goal) * 100
    );
    
    const isGoalReached = progressPercentage >= 100;
    
    // Check if dark mode is active by looking at the document element
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    // State to track image loading errors
    const [imgError, setImgError] = useState(false);
    
    // Check if the background image URL is valid
    const hasValidImageUrl = config.rightPanel.backgroundImage && 
                            config.rightPanel.backgroundImage.trim() !== '';

    return (
      <div
        ref={ref}
        className={cn(
          "h-full w-full flex overflow-hidden",
          isDarkMode ? "bg-gray-900" : "bg-white",
          "border-4 border-dashed",
          isDarkMode ? "border-gray-600" : "border-gray-300"
        )}
        style={{ 
          fontFamily: 'Arial, sans-serif',
          width: config.dimensions?.width || '8in',
          height: config.dimensions?.height || '10in',
        }}
      >
        {/* Left side - Calendar */}
        <div className="w-3/5 p-8 relative flex flex-col">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <path fill={isDarkMode ? "#4B5563" : "#CED4DA"} d="M42.9,-55.8C55.3,-43.8,65,-29.2,71.7,-11.3C78.4,6.6,82.1,27.8,74,41.3C65.9,54.9,46.1,60.9,27.6,66.5C9.2,72.2,-7.9,77.6,-24.5,74.3C-41.1,71.1,-57.2,59.3,-65.7,43.6C-74.3,27.9,-75.4,8.3,-70.6,-8.2C-65.8,-24.8,-55.1,-38.3,-42.3,-50.3C-29.5,-62.3,-14.7,-72.8,0.6,-73.6C16,-74.3,30.5,-67.8,42.9,-55.8Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="relative z-10 flex-1 flex flex-col items-center w-full !px-4">
            <h1 className={cn("text-5xl font-black mb-3 text-center", isDarkMode ? "text-white" : "text-slate-800")}>{config.title}</h1>
            <h2 className={cn("text-2xl font-medium mb-10 text-center", isDarkMode ? "text-gray-300" : "text-slate-600")}>{config.subtitle}</h2>
            
            <div className="space-y-6 w-full">
              {config.days.map((day, index) => (
                <div key={index} className="relative w-full">
                  {/* Optional indicator */}
                  {day.isOptional && (
                    <div className="absolute -top-3 right-0 bg-blue-600 text-white text-xs px-3 py-1 font-bold">
                      OPTIONAL
                    </div>
                  )}
                  
                  {/* Day header */}
                  <div className={cn(
                    "flex items-center !p-2",
                    isDarkMode ? "bg-gray-800 text-white" : "bg-slate-800 text-white"
                  )}>
                    <div className="flex-1 text-center font-bold text-lg">{day.day}</div>
                    <div className="text-right font-medium">{day.date}</div>
                  </div>
                  
                  {/* Events */}
                  <div className={cn(
                    "!p-2 shadow-sm w-full",
                    isDarkMode ? "bg-gray-700" : "bg-white"
                  )}>
                    {day.events && day.events.length > 0 ? (
                      day.events.map((event, eventIndex) => (
                        <div 
                          key={eventIndex} 
                          className={cn(
                            "mb-2 last:mb-0 flex items-start w-full",
                            event.time ? "justify-between" : "justify-center"
                          )}
                        >
                          <div className={cn(
                            "font-medium",
                            event.time ? "text-left flex-1 pr-3" : "text-center",
                            isDarkMode ? "text-white" : "text-gray-800"
                          )}>
                            {event.title}
                          </div>
                          {event.time && (
                            <div className={cn(
                              "text-right font-bold whitespace-nowrap",
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            )}>
                              {event.time}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className={cn(
                        "text-center italic py-2 w-full",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>
                        No events scheduled
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right side - Hero and hashtags */}
        <div className="w-2/5 relative">
          {/* Background image container with fallback */}
          <div className="absolute inset-0 bg-gray-800 overflow-hidden">
            {hasValidImageUrl && !imgError ? (
              <img 
                src={config.rightPanel.backgroundImage}
                alt="Background"
                className="w-full h-full object-cover"
                onError={() => {
                  console.error("Failed to load image:", config.rightPanel.backgroundImage);
                  setImgError(true);
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-opacity-50">
                <p className="text-sm">No background image</p>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">
            {/* Hashtags */}
            <div className="flex-1 flex flex-col justify-center">
              {config.rightPanel.hashtags.map((hashtag, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "text-5xl font-bold mb-4 drop-shadow-md",
                    index % 2 === 0 ? "text-white" : "text-yellow-300"
                  )}
                >
                  {hashtag}
                </div>
              ))}
              
              {config.rightPanel.hashtags.length === 0 && (
                <div className="text-center text-white text-opacity-70 italic">
                  Add hashtags in the editor
                </div>
              )}
            </div>
            
            {/* Progress bar */}
            <div className="mt-auto">
              <div className="mb-2 relative">
                <Progress 
                  value={progressPercentage} 
                  className="h-8 rounded-full overflow-hidden bg-gray-700 bg-opacity-50" 
                  style={{ 
                    '--progress-background': config.progress.color 
                  } as React.CSSProperties}
                />
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold drop-shadow-md">
                  {`${config.progress.current}/${config.progress.goal}`}
                </div>
                {isGoalReached && (
                  <div className="absolute -top-6 right-0 text-3xl">
                    🎉 🎊
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CalendarPreview.displayName = 'CalendarPreview'; 