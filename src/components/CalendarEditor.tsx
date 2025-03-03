import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { GeneralTab } from './tabs/GeneralTab';
import { DaysTab } from './tabs/DaysTab';
import { RightPanelTab } from './tabs/RightPanelTab';
import { ProgressTab } from './tabs/ProgressTab';
import { FlierConfig, defaultFlierConfig } from '../lib/types';

// Helper function to format date as MM/DD
const formatDate = (date: Date): string => {
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

// Get week dates starting from a given date
const getWeekDates = (startDate: Date): string[] => {
  const dates: string[] = [];
  const currentDate = new Date(startDate);
  
  for (let i = 0; i < 7; i++) {
    dates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

interface CalendarEditorProps {
  config: FlierConfig;
  onChange: (config: FlierConfig) => void;
}

export function CalendarEditor({ config, onChange }: CalendarEditorProps) {
  const [activeTab, setActiveTab] = useState<string>('general');
  const [startDate, setStartDate] = useState(new Date());
  const initialRender = useRef(true);

  const updateConfig = (updates: Partial<FlierConfig>) => {
    onChange({ ...config, ...updates });
  };

  const resetToDefault = () => {
    onChange(defaultFlierConfig);
  };

  // Update dates when the start date changes, but avoid infinite loops
  useEffect(() => {
    // Skip on initial render to prevent unnecessary updates
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const weekDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const dates = getWeekDates(startDate);
    
    // Only update dates, keep other day properties
    const newDays = [...config.days].map((day, index) => ({
      ...day,
      day: weekDays[index],
      date: dates[index]
    }));
    
    onChange({ ...config, days: newDays });
  }, [startDate]); // Only depend on startDate

  // Handler for week start date change
  const handleWeekStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setStartDate(date);
    }
  };

  return (
    <div className="h-full overflow-y-auto !p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Calendar Editor</h2>
        <Button variant="outline" onClick={resetToDefault}>Reset to Default</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="days">Days</TabsTrigger>
          <TabsTrigger value="rightPanel">Right Panel</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <GeneralTab config={config} updateConfig={updateConfig} />
        </TabsContent>

        <TabsContent value="days">
          <DaysTab 
            config={config} 
            updateConfig={updateConfig} 
            startDate={startDate}
            onStartDateChange={handleWeekStartChange}
          />
        </TabsContent>

        <TabsContent value="rightPanel">
          <RightPanelTab config={config} updateConfig={updateConfig} />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTab config={config} updateConfig={updateConfig} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 