import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { FlierConfig, DayBlock, DayEvent } from '../../lib/types';

interface DaysTabProps {
  config: FlierConfig;
  updateConfig: (updates: Partial<FlierConfig>) => void;
  startDate: Date;
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DaysTab({ config, updateConfig, startDate, onStartDateChange }: DaysTabProps) {
  const updateDay = (index: number, dayUpdates: Partial<DayBlock>) => {
    const newDays = [...config.days];
    newDays[index] = { ...newDays[index], ...dayUpdates };
    updateConfig({ days: newDays });
  };

  const updateEvent = (dayIndex: number, eventIndex: number, eventUpdates: Partial<DayEvent>) => {
    const newDays = [...config.days];
    newDays[dayIndex].events[eventIndex] = { 
      ...newDays[dayIndex].events[eventIndex], 
      ...eventUpdates 
    };
    updateConfig({ days: newDays });
  };

  const addEvent = (dayIndex: number) => {
    const newDays = [...config.days];
    newDays[dayIndex].events.push({ title: '', time: '' });
    updateConfig({ days: newDays });
  };

  const removeEvent = (dayIndex: number, eventIndex: number) => {
    const newDays = [...config.days];
    newDays[dayIndex].events.splice(eventIndex, 1);
    updateConfig({ days: newDays });
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <CardHeader className="pb-4">
          <CardTitle>Week Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label htmlFor="week-start">Week Starting Date</Label>
            <Input 
              id="week-start"
              type="date"
              onChange={(e) => {
                const selected = new Date(e.target.value);
                // Adjust to the Sunday of that week if not already Sunday
                if (selected.getDay() !== 0) {
                  selected.setDate(selected.getDate() - selected.getDay());
                  // Overwrite the value to the corrected Sunday
                  e.target.value = selected.toISOString().slice(0, 10);
                }
                onStartDateChange(e);
              }}
              className="w-full"
              value={startDate.toISOString().slice(0, 10)}
              step="7"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Select a date to automatically fill in the days of the week
            </p>
          </div>
        </CardContent>
      </Card>
      
      {config.days.map((day, dayIndex) => (
        <Card key={dayIndex} className="p-4">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{day.day}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">{day.date}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-none">
              <Checkbox 
                id={`optional-${dayIndex}`} 
                checked={day.isOptional}
                onCheckedChange={(checked) => 
                  updateDay(dayIndex, { isOptional: !!checked })
                }
              />
              <Label htmlFor={`optional-${dayIndex}`} className="font-medium">Optional Day</Label>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Events</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addEvent(dayIndex)}
                  className="flex items-center"
                >
                  <span className="mr-1">+</span> Add Event
                </Button>
              </div>

              {day.events.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic p-3 text-center bg-gray-50 dark:bg-gray-800 rounded-md">
                  No events added. Click "Add Event" to create one.
                </p>
              )}

              {day.events.map((event, eventIndex) => (
                <div key={eventIndex} className="space-y-4 p-4 bg-white dark:bg-gray-800 ounded-none">
                  <div className="flex justify-between items-center border-b dark:border-gray-700 pb-3">
                    <h4 className="font-medium">Event {eventIndex + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeEvent(dayIndex, eventIndex)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-none"
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor={`event-title-${dayIndex}-${eventIndex}`}>Title</Label>
                    <Input 
                      id={`event-title-${dayIndex}-${eventIndex}`}
                      value={event.title} 
                      onChange={(e) => updateEvent(dayIndex, eventIndex, { title: e.target.value })} 
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor={`event-time-${dayIndex}-${eventIndex}`}>Time</Label>
                    <Input 
                      id={`event-time-${dayIndex}-${eventIndex}`}
                      value={event.time} 
                      onChange={(e) => updateEvent(dayIndex, eventIndex, { time: e.target.value })} 
                      placeholder="e.g. 8:00PM or ALL DAY"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 