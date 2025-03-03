import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FlierConfig } from '../../lib/types';

interface GeneralTabProps {
  config: FlierConfig;
  updateConfig: (updates: Partial<FlierConfig>) => void;
}

export function GeneralTab({ config, updateConfig }: GeneralTabProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 flex flex-col gap-5">
        <div className="space-y-3">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title"
            value={config.title} 
            onChange={(e) => updateConfig({ title: e.target.value })} 
            className="font-medium"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input 
            id="subtitle"
            value={config.subtitle} 
            onChange={(e) => updateConfig({ subtitle: e.target.value })} 
          />
        </div>
        
        <div className="space-y-3 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="width" className="text-sm">Width</Label>
              <Input 
                id="width"
                value={config.dimensions.width} 
                onChange={(e) => updateConfig({ 
                  dimensions: { ...config.dimensions, width: e.target.value } 
                })} 
                placeholder="e.g., 8in"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-sm">Height</Label>
              <Input 
                id="height"
                value={config.dimensions.height} 
                onChange={(e) => updateConfig({ 
                  dimensions: { ...config.dimensions, height: e.target.value } 
                })} 
                placeholder="e.g., 10in"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Standard flyer sizes: 8.5in x 11in (Letter), 8in x 10in, or 5in x 7in
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 