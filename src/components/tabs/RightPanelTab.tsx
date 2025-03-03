import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { FlierConfig } from '../../lib/types';

interface RightPanelTabProps {
  config: FlierConfig;
  updateConfig: (updates: Partial<FlierConfig>) => void;
}

export function RightPanelTab({ config, updateConfig }: RightPanelTabProps) {
  const updateHashtag = (index: number, value: string) => {
    const newHashtags = [...config.rightPanel.hashtags];
    newHashtags[index] = { ...newHashtags[index], text: value };
    updateConfig({ 
      rightPanel: { 
        ...config.rightPanel, 
        hashtags: newHashtags 
      } 
    });
  };
  
  const updateHashtagColor = (index: number, color: string) => {
    const newHashtags = [...config.rightPanel.hashtags];
    newHashtags[index] = { ...newHashtags[index], color };
    updateConfig({ 
      rightPanel: { 
        ...config.rightPanel, 
        hashtags: newHashtags 
      } 
    });
  };

  const addHashtag = () => {
    updateConfig({ 
      rightPanel: { 
        ...config.rightPanel, 
        hashtags: [...config.rightPanel.hashtags, { text: '', color: '#FFFFFF' }] 
      } 
    });
  };

  const removeHashtag = (index: number) => {
    const newHashtags = [...config.rightPanel.hashtags];
    newHashtags.splice(index, 1);
    updateConfig({ 
      rightPanel: { 
        ...config.rightPanel, 
        hashtags: newHashtags 
      } 
    });
  };

  return (
    <Card className="p-4">
      <CardHeader className="pb-4">
        <CardTitle>Right Panel Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="background-image">Background Image URL</Label>
          <Input 
            id="background-image"
            value={config.rightPanel.backgroundImage} 
            onChange={(e) => updateConfig({ 
              rightPanel: { 
                ...config.rightPanel, 
                backgroundImage: e.target.value.trim() 
              } 
            })} 
            placeholder="Enter image URL (https://...)"
          />
          {config.rightPanel.backgroundImage && config.rightPanel.backgroundImage.trim() !== '' ? (
            <div className="mt-3 rounded-md overflow-hidden h-40 bg-zinc-100">
              <img 
                src={config.rightPanel.backgroundImage} 
                alt="Background preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Failed to load image:', config.rightPanel.backgroundImage);
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                }}
              />
            </div>
          ) : (
            <div className="mt-3 rounded-md overflow-hidden h-40 bg-zinc-100 flex items-center justify-center text-gray-400">
              <p>No image URL provided</p>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Hashtags</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={addHashtag}
              className="flex items-center"
            >
              <span className="mr-1">+</span> Add Hashtag
            </Button>
          </div>

          {config.rightPanel.hashtags.length === 0 && (
            <p className="text-sm text-gray-500 italic p-3 text-center bg-gray-50 rounded-md">
              No hashtags added. Click "Add Hashtag" to create one.
            </p>
          )}

          {config.rightPanel.hashtags.map((hashtag, index) => (
            <div key={index} className="flex space-x-3 items-center">
              <Input 
                value={hashtag.text} 
                onChange={(e) => updateHashtag(index, e.target.value)}
                placeholder={`Hashtag #${index + 1}`}
                className="flex-grow"
              />
              <div className="flex items-center space-x-2">
                <Label htmlFor={`hashtag-color-${index}`} className="sr-only">Color</Label>
                <input 
                  type="color" 
                  id={`hashtag-color-${index}`}
                  value={hashtag.color}
                  onChange={(e) => updateHashtagColor(index, e.target.value)}
                  className="w-10 h-10 p-1 rounded border cursor-pointer"
                />
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeHashtag(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10 flex-shrink-0"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 