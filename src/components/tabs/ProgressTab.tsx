import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FlierConfig } from '../../lib/types';
import { Progress } from '../ui/progress';
import { useEffect } from 'react';

interface ProgressTabProps {
  config: FlierConfig;
  updateConfig: (updates: Partial<FlierConfig>) => void;
}

export function ProgressTab({ config, updateConfig }: ProgressTabProps) {
  // Calculate progress percentage for the preview
  const progressPercentage = Math.min(
    100,
    (config.progress.current / config.progress.goal) * 100
  );
  
  // Update the label automatically when current or goal changes
  useEffect(() => {
    // Only update if the label doesn't match the current/goal values
    const autoLabel = `${config.progress.current}/${config.progress.goal}`;
    if (config.progress.label !== autoLabel) {
      updateConfig({
        progress: {
          ...config.progress,
          label: autoLabel
        }
      });
    }
  }, [config.progress.current, config.progress.goal]);

  return (
    <Card className="p-4">
      <CardHeader className="pb-4">
        <CardTitle>Progress Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="current-progress">Current Progress</Label>
          <Input 
            id="current-progress"
            type="number"
            value={config.progress.current.toString()} 
            onChange={(e) => updateConfig({ 
              progress: { 
                ...config.progress, 
                current: parseInt(e.target.value) || 0 
              } 
            })} 
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="goal-progress">Goal</Label>
          <Input 
            id="goal-progress"
            type="number"
            value={config.progress.goal.toString()} 
            onChange={(e) => updateConfig({ 
              progress: { 
                ...config.progress, 
                goal: parseInt(e.target.value) || 0 
              } 
            })} 
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="progress-color">Progress Bar Color</Label>
          <div className="flex items-center space-x-3">
            <Input 
              id="progress-color"
              type="color"
              value={config.progress.color} 
              onChange={(e) => updateConfig({ 
                progress: { 
                  ...config.progress, 
                  color: e.target.value 
                } 
              })} 
              className="w-16 h-10 p-1"
            />
            <Input 
              value={config.progress.color} 
              onChange={(e) => updateConfig({ 
                progress: { 
                  ...config.progress, 
                  color: e.target.value 
                } 
              })} 
              placeholder="#3b82f6"
              className="flex-1"
            />
          </div>
        </div>
        
        {/* Progress bar preview */}
        <div className="pt-4 space-y-2">
          <Label>Preview</Label>
          <div className="relative">
            <Progress 
              value={progressPercentage} 
              className="h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700" 
              style={{ 
                '--progress-background': config.progress.color 
              } as React.CSSProperties}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
              {config.progress.label}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 