
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Play, 
  Plus, 
  Save,
  Share2,
  Video,
  Combine, 
  Trash2,
  ArrowUp,
  ArrowDown,
  Twitter,
  Download
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for available videos
const availableVideos = [
  { id: 1, title: 'Screen Recording 1', duration: '00:45', thumbnail: 'bg-blue-900/30' },
  { id: 2, title: 'Product Demo', duration: '02:15', thumbnail: 'bg-green-900/30' },
  { id: 3, title: 'Bug Report', duration: '01:30', thumbnail: 'bg-red-900/30' },
  { id: 4, title: 'Feature Overview', duration: '03:20', thumbnail: 'bg-purple-900/30' },
  { id: 5, title: 'User Interview', duration: '15:45', thumbnail: 'bg-yellow-900/30' },
  { id: 6, title: 'Quick Notes', duration: '00:55', thumbnail: 'bg-orange-900/30' },
];

const VideoCreator = () => {
  const { toast } = useToast();
  const [projectTitle, setProjectTitle] = useState('New Video Project');
  const [selectedVideos, setSelectedVideos] = useState<typeof availableVideos>([]);
  
  const addToProject = (video: typeof availableVideos[0]) => {
    setSelectedVideos(prev => [...prev, video]);
    toast({
      title: "Video added",
      description: `${video.title} added to your project`,
    });
  };
  
  const removeFromProject = (id: number) => {
    setSelectedVideos(prev => prev.filter(v => v.id !== id));
    toast({
      title: "Video removed",
      description: "Video removed from your project",
    });
  };
  
  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === selectedVideos.length - 1)
    ) return;
    
    const newList = [...selectedVideos];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];
    setSelectedVideos(newList);
  };
  
  const handleCreateVideo = () => {
    if (selectedVideos.length === 0) {
      toast({
        title: "Cannot create video",
        description: "Please add at least one clip to your project",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Creating video",
      description: "Combining selected clips into a new video...",
    });
    
    // Mock processing delay
    setTimeout(() => {
      toast({
        title: "Video created",
        description: `${projectTitle} has been created successfully!`,
      });
    }, 2000);
  };
  
  const handleShareToX = () => {
    toast({
      title: "Sharing to X",
      description: "Preparing to share on X (Twitter)...",
    });
    
    // Mock share action
    setTimeout(() => {
      toast({
        title: "Ready to share",
        description: "Your video is ready to share on X (Twitter)",
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl blue-gradient-text">Video Creator</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-accent/30">
            <Save className="mr-2 h-4 w-4" />
            Save Project
          </Button>
          <Button 
            className="bg-accent hover:bg-accent/90"
            onClick={handleCreateVideo}
          >
            <Combine className="mr-2 h-4 w-4" />
            Create Video
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <Card className="glass-card p-4">
            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-2 block">Project Title</label>
              <Input 
                value={projectTitle} 
                onChange={(e) => setProjectTitle(e.target.value)}
                className="bg-black/30 border-accent/30"
              />
            </div>
            
            <div className="aspect-video bg-black relative flex items-center justify-center rounded-lg overflow-hidden">
              {selectedVideos.length > 0 ? (
                <div className="text-center">
                  <div className={`${selectedVideos[0].thumbnail} absolute inset-0 opacity-30`}></div>
                  <Video className="h-12 w-12 text-accent/80 mb-2" />
                  <p className="text-white/80 text-sm">Preview of combined video</p>
                  <p className="text-white/60 text-xs mt-1">
                    {selectedVideos.length} clips - Total duration: {selectedVideos.reduce((acc, curr) => {
                      const [min, sec] = curr.duration.split(':').map(Number);
                      return acc + min * 60 + sec;
                    }, 0)}s
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <Plus className="h-12 w-12 text-gray-500 mb-2" />
                  <p className="text-gray-500">Add videos to your project</p>
                </div>
              )}
            </div>
          </Card>
          
          <Card className="glass-card p-4">
            <h3 className="text-lg font-medium mb-4">Project Timeline</h3>
            {selectedVideos.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-gray-700 rounded-lg">
                <p className="text-gray-500">No videos added yet</p>
                <p className="text-gray-600 text-sm mt-1">Add videos from the library on the right</p>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedVideos.map((video, index) => (
                  <div key={video.id} className="flex items-center gap-2 p-2 bg-black/20 rounded-lg">
                    <div className="w-24">
                      <AspectRatio ratio={16/9} className={`${video.thumbnail} rounded-md flex items-center justify-center`}>
                        <Play className="h-4 w-4 text-white/80" />
                      </AspectRatio>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{video.title}</div>
                      <div className="text-xs text-gray-400">{video.duration}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-7 w-7 text-gray-400 hover:text-white"
                        onClick={() => moveItem(index, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-7 w-7 text-gray-400 hover:text-white"
                        onClick={() => moveItem(index, 'down')}
                        disabled={index === selectedVideos.length - 1}
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-7 w-7 text-gray-400 hover:text-white"
                        onClick={() => removeFromProject(video.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {selectedVideos.length > 0 && (
              <div className="mt-4 flex gap-2 justify-end">
                <Button onClick={handleShareToX} variant="outline" className="border-accent/30">
                  <Twitter className="mr-2 h-4 w-4" />
                  Share to X
                </Button>
                <Button variant="outline" className="border-accent/30">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            )}
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-4">
          <Card className="glass-card p-4">
            <Tabs defaultValue="library" className="w-full">
              <TabsList className="bg-muted/30 w-full grid grid-cols-2">
                <TabsTrigger value="library">Video Library</TabsTrigger>
                <TabsTrigger value="recent">Recent Recordings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="library" className="mt-4">
                <div className="grid grid-cols-2 gap-2">
                  {availableVideos.map((video) => (
                    <div 
                      key={video.id} 
                      className="glass-card border-accent/10 p-2 rounded-lg cursor-pointer hover:border-accent/30 transition-colors"
                      onClick={() => addToProject(video)}
                    >
                      <AspectRatio ratio={16/9} className={`${video.thumbnail} rounded-md mb-2 flex items-center justify-center`}>
                        <Play className="h-6 w-6 text-white/80" />
                      </AspectRatio>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium truncate">{video.title}</span>
                        <span className="text-xs text-gray-400">{video.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="mt-4">
                <div className="grid grid-cols-2 gap-2">
                  {availableVideos.slice(0, 4).map((video) => (
                    <div 
                      key={video.id} 
                      className="glass-card border-accent/10 p-2 rounded-lg cursor-pointer hover:border-accent/30 transition-colors"
                      onClick={() => addToProject(video)}
                    >
                      <AspectRatio ratio={16/9} className={`${video.thumbnail} rounded-md mb-2 flex items-center justify-center`}>
                        <Play className="h-6 w-6 text-white/80" />
                      </AspectRatio>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium truncate">{video.title}</span>
                        <span className="text-xs text-gray-400">{video.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          
          <Card className="glass-card p-4">
            <h3 className="text-lg font-medium mb-4">Creator Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Output Format</label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-accent text-white">MP4</Button>
                  <Button variant="outline" size="sm" className="border-accent/30">WebM</Button>
                  <Button variant="outline" size="sm" className="border-accent/30">GIF</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Transition Style</label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-accent text-white">None</Button>
                  <Button variant="outline" size="sm" className="border-accent/30">Fade</Button>
                  <Button variant="outline" size="sm" className="border-accent/30">Wipe</Button>
                  <Button variant="outline" size="sm" className="border-accent/30">Zoom</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoCreator;
