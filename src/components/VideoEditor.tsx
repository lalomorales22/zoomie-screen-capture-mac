
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Scissors, 
  Volume2, 
  Play, 
  Pause,
  SkipBack, 
  SkipForward,
  Save,
  Download,
  Crop,
  Video,
  Mic,
  Text,
  Image,
  Share,
  Twitter
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Mock data for gallery
const mockClips = [
  { id: 1, title: 'Intro', duration: '00:15', thumbnail: 'bg-blue-900/20' },
  { id: 2, title: 'Demo', duration: '01:45', thumbnail: 'bg-green-900/20' },
  { id: 3, title: 'Conclusion', duration: '00:30', thumbnail: 'bg-purple-900/20' },
  { id: 4, title: 'Interview Clip', duration: '02:10', thumbnail: 'bg-red-900/20' },
];

const VideoEditor = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("tools");
  
  const handleShare = () => {
    toast({
      title: "Sharing to X",
      description: "Preparing your video to share on X (Twitter)...",
    });
    
    // Mock share action
    setTimeout(() => {
      toast({
        title: "Share ready",
        description: "Your video is ready to share on X (Twitter)",
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl blue-gradient-text">Video Editor</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-accent/30">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button className="bg-accent hover:bg-accent/90">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleShare} variant="outline" className="border-accent/30">
            <Twitter className="mr-2 h-4 w-4" />
            Share to X
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <Card className="glass-card p-4 aspect-video flex items-center justify-center bg-black relative">
            <div className="text-gray-500">Preview area</div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black/60 rounded-full px-3 py-1">
              <Button size="icon" variant="ghost" className="text-white h-8 w-8">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white h-8 w-8">
                <Play className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white h-8 w-8">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </Card>
          
          <Card className="glass-card p-4">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">00:00</span>
                  <span className="text-sm text-gray-400">03:45</span>
                </div>
                <div className="relative">
                  <div className="h-16 bg-muted/30 rounded-md overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-blue-900/20 via-blue-600/20 to-blue-900/20"></div>
                  </div>
                  <div className="absolute left-1/3 top-0 h-full border-l-2 border-accent"></div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Slider 
                  defaultValue={[75]} 
                  max={100} 
                  step={1}
                  className="w-32" 
                />
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8 border-accent/30">
                    <Scissors className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8 border-accent/30">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-muted/30 w-full grid grid-cols-2">
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="gallery">Clips Gallery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tools" className="mt-4 space-y-4">
              <Card className="glass-card p-4">
                <h3 className="text-lg font-medium mb-4">Tools</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="flex-col h-20 border-accent/30">
                    <Crop className="h-5 w-5 mb-1" />
                    <span className="text-xs">Crop</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-20 border-accent/30">
                    <Scissors className="h-5 w-5 mb-1" />
                    <span className="text-xs">Trim</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-20 border-accent/30">
                    <Text className="h-5 w-5 mb-1" />
                    <span className="text-xs">Text</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-20 border-accent/30">
                    <Video className="h-5 w-5 mb-1" />
                    <span className="text-xs">Effects</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-20 border-accent/30">
                    <Mic className="h-5 w-5 mb-1" />
                    <span className="text-xs">Audio</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-20 border-accent/30">
                    <Volume2 className="h-5 w-5 mb-1" />
                    <span className="text-xs">Volume</span>
                  </Button>
                </div>
              </Card>
              
              <Card className="glass-card p-4">
                <h3 className="text-lg font-medium mb-4">Properties</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Resolution</label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-accent text-white">1080p</Button>
                      <Button variant="outline" size="sm" className="border-accent/30">720p</Button>
                      <Button variant="outline" size="sm" className="border-accent/30">480p</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Format</label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-accent text-white">MP4</Button>
                      <Button variant="outline" size="sm" className="border-accent/30">WebM</Button>
                      <Button variant="outline" size="sm" className="border-accent/30">GIF</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Quality</label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-accent text-white">High</Button>
                      <Button variant="outline" size="sm" className="border-accent/30">Medium</Button>
                      <Button variant="outline" size="sm" className="border-accent/30">Low</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="gallery" className="mt-4">
              <Card className="glass-card p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Project Clips</h3>
                  <Button size="sm" variant="outline" className="border-accent/30">
                    <Image className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {mockClips.map((clip) => (
                    <div key={clip.id} className="glass-card border-accent/10 p-2 rounded-lg cursor-pointer hover:border-accent/30 transition-colors">
                      <AspectRatio ratio={16/9} className={`${clip.thumbnail} rounded-md mb-2 flex items-center justify-center`}>
                        <Play className="h-6 w-6 text-white/80" />
                      </AspectRatio>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium">{clip.title}</span>
                        <span className="text-xs text-gray-400">{clip.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button size="sm" variant="outline" className="border-accent/30 w-full">
                    Load More Clips
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
