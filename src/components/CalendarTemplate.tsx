import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { CalendarEditor } from './CalendarEditor';
import { CalendarPreview } from './CalendarPreview';
import { FlierConfig, defaultFlierConfig } from '../lib/types';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Sun, Moon, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

export function CalendarTemplate() {
  const [config, setConfig] = useState<FlierConfig>(defaultFlierConfig);
  const previewRef = useRef<HTMLDivElement>(null);
  const [editorWidth, setEditorWidth] = useState<number>(30);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleExport = async () => {
    if (!previewRef.current) return;
    
    try {
      // Generate the image
      const dataUrl = await toPng(previewRef.current, { 
        quality: 0.95,
        pixelRatio: 2
      });
      
      // Create a download link
      const link = document.createElement('a');
      link.download = 'calendar-flyer.png';
      link.href = dataUrl;
      link.click();
      
      // Trigger confetti when export is successful
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error('Error exporting image:', error);
      alert('Failed to export image. Please try again.');
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const newWidth = (e.clientX / containerWidth) * 100;
    
    // Clamp the editor width between 20% and 50%
    const clampedWidth = Math.min(Math.max(newWidth, 20), 50);
    
    setEditorWidth(clampedWidth);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  const resetZoom = () => {
    setZoomLevel(0.85);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    // Also update the root element with the dark class
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Initialize dark mode based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Add document-level event handlers for smooth dragging
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        
        const containerWidth = containerRef.current.clientWidth;
        const newWidth = (e.clientX / containerWidth) * 100;
        
        // Clamp the editor width between 20% and 50%
        const clampedWidth = Math.min(Math.max(newWidth, 20), 50);
        
        setEditorWidth(clampedWidth);
      };
      
      const handleMouseUp = () => {
        setIsDragging(false);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <header className="bg-slate-900 dark:bg-slate-950 text-white p-4 px-6 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-xl font-bold">Weekly Calendar Template</h1>
          <p className="text-sm text-slate-300">Create custom event flyers with ease</p>
        </div>
        <div className="flex space-x-3 items-center">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleDarkMode}
            className="border-slate-600 hover:bg-slate-800 mr-2"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-slate-600 hover:bg-slate-800 !px-4">
                <span className="mr-2">👁️</span>
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl h-[85vh]">
              <DialogHeader>
                <DialogTitle>Calendar Preview</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-auto border rounded-md shadow-lg bg-gray-100 dark:bg-gray-800 relative">
                <div className="min-h-full w-full flex items-center justify-center p-8">
                  <div className="relative">
                    {/* Dimensions label */}
                    <div className="absolute -top-8 left-0 right-0 text-center text-sm text-gray-500 dark:text-gray-400">
                      {config.dimensions?.width || '8in'} × {config.dimensions?.height || '10in'}
                    </div>
                    
                    {/* Preview container with checkerboard background */}
                    <div className="bg-gray-200 dark:bg-gray-600 p-4 shadow-xl rounded-lg overflow-hidden flex items-center justify-center">
                      <div 
                        className="relative transform origin-center"
                        style={{ transform: `scale(${zoomLevel})` }}
                      >
                        <CalendarPreview config={config} ref={previewRef} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Zoom controls */}
                <div className="absolute bottom-4 left-4 flex space-x-2 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg shadow-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={zoomIn}
                    className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={zoomOut}
                    className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetZoom}
                    className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
                  <span className="mr-2">📥</span>
                  Export as PNG
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            onClick={handleExport} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            <span className="mr-2">📥</span>
            Export
          </Button>
        </div>
      </header>
      
      <main 
        className={`flex-1 flex overflow-hidden ${isDarkMode ? 'dark' : ''}`}
        ref={containerRef}
        onMouseMove={isDragging ? handleDrag : undefined}
      >
        {/* Left panel - Editor */}
        <div 
          className="border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-auto p-4"
          style={{ width: `${editorWidth}%` }}
        >
          <CalendarEditor config={config} onChange={setConfig} />
        </div>
        
        {/* Resizer handle */}
        <div 
          className="w-1 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-500 cursor-col-resize flex items-center justify-center z-10 relative active:bg-blue-600"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
        >
          <div className="absolute w-6 h-12 bg-blue-500 dark:bg-blue-600 rounded-md flex items-center justify-center -right-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <circle cx="8" cy="12" r="1" />
              <circle cx="16" cy="12" r="1" />
            </svg>
          </div>
        </div>
        
        {/* Right panel - Preview */}
        <div 
          className="overflow-auto bg-gray-100 dark:bg-gray-900 p-8 flex items-center justify-center relative"
          style={{ width: `${100 - editorWidth}%` }}
        >
          <div className="relative">
            {/* Dimensions label */}
            <div className="absolute -top-8 left-0 right-0 text-center text-sm text-gray-500 dark:text-gray-400">
              {config.dimensions?.width || '8in'} × {config.dimensions?.height || '10in'}
            </div>
            
            {/* Preview container with checkerboard background */}
            <div className="bg-gray-200 dark:bg-gray-600 p-4 shadow-xl rounded-lg overflow-hidden flex items-center justify-center">
              <div 
                className="relative origin-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* Transparent overlay with help text - only shown initially */}
                {config === defaultFlierConfig && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex flex-col items-center justify-center text-white p-6 pointer-events-none">
                    <h3 className="text-xl font-bold mb-2">Live Preview</h3>
                    <p className="text-center mb-4">
                      Edit your calendar in the left panel to see changes here in real-time
                    </p>
                    <div className="text-4xl animate-bounce">👈</div>
                  </div>
                )}
                <CalendarPreview config={config} ref={previewRef} />
              </div>
            </div>
          </div>
          
          {/* Zoom controls */}
          <div className="absolute bottom-4 left-4 flex space-x-2 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg shadow-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomIn}
              className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomOut}
              className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetZoom}
              className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 