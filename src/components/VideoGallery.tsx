
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Edit2, Trash2, Star, BarChart2, FileText } from 'lucide-react';

// Mock data
const mockVideos = [
  { id: 1, title: 'Screen Recording 1', duration: '00:45', date: '2025-05-11', category: 'Tutorial', rating: 4 },
  { id: 2, title: 'Product Demo', duration: '02:15', date: '2025-05-10', category: 'Demo', rating: 5 },
  { id: 3, title: 'Bug Report', duration: '01:30', date: '2025-05-09', category: 'Bug', rating: 3 },
  { id: 4, title: 'Feature Overview', duration: '03:20', date: '2025-05-08', category: 'Tutorial', rating: 4 },
  { id: 5, title: 'User Interview', duration: '15:45', date: '2025-05-07', category: 'Interview', rating: 5 },
  { id: 6, title: 'Quick Notes', duration: '00:55', date: '2025-05-06', category: 'Notes', rating: 3 },
];

const VideoGallery = () => {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl blue-gradient-text">Video Gallery</h2>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="bg-muted/30 border-accent/30">
            Import
          </Button>
          <Button className="bg-accent hover:bg-accent/90">
            New Recording
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-muted/30 w-fit">
          <TabsTrigger value="all">All Videos</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockVideos.slice(0, 3).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockVideos.filter(v => v.rating >= 4).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="categories" className="mt-4">
          <div className="mb-4 flex gap-2 flex-wrap">
            {['All', 'Tutorial', 'Demo', 'Bug', 'Interview', 'Notes'].map((category) => (
              <Button 
                key={category} 
                variant={category === 'All' ? "default" : "outline"}
                size="sm"
                className={category === 'All' ? "bg-accent" : "bg-muted/30"}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    duration: string;
    date: string;
    category: string;
    rating: number;
  };
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Card className="glass-card overflow-hidden">
      <div className="relative aspect-video bg-black flex items-center justify-center group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button size="icon" variant="ghost" className="text-white bg-accent/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="h-6 w-6" />
        </Button>
        <div className="absolute bottom-2 right-2 text-xs bg-black/60 px-2 py-1 rounded text-white">
          {video.duration}
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base">{video.title}</CardTitle>
        <CardDescription className="text-xs flex justify-between items-center">
          <span>{video.date}</span>
          <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-full">{video.category}</span>
        </CardDescription>
      </CardHeader>
      
      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <div className="flex space-x-0.5">
          {Array(5).fill(0).map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < video.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-500"}
            />
          ))}
        </div>
        <div className="flex space-x-1">
          <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-white">
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-white">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VideoGallery;
