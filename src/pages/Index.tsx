
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Minimize2 } from "lucide-react";
import ScreenRecorder from '@/components/ScreenRecorder';
import VideoGallery from '@/components/VideoGallery';
import VideoEditor from '@/components/VideoEditor';
import VideoCreator from '@/components/VideoCreator';
import Dashboard from '@/components/Dashboard';
import DraggableWidget from '@/components/DraggableWidget';

const Index = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {!isMinimized && (
        <div className="min-h-screen p-6 pb-24">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold blue-gradient-text">
              Screen Recorder Pro
            </h1>
            
            <Button 
              className="minimize-button"
              size="icon"
              onClick={() => setIsMinimized(true)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="bg-muted/30 w-fit mb-6">
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="editor">Video Editor</TabsTrigger>
              <TabsTrigger value="creator">Video Creator</TabsTrigger>
              <TabsTrigger value="dashboard">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gallery" className="mt-0">
              <VideoGallery />
            </TabsContent>
            
            <TabsContent value="editor" className="mt-0">
              <VideoEditor />
            </TabsContent>
            
            <TabsContent value="creator" className="mt-0">
              <VideoCreator />
            </TabsContent>
            
            <TabsContent value="dashboard" className="mt-0">
              <Dashboard />
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {isMinimized && (
        <Button
          className="fixed top-4 left-4 z-50 bg-accent hover:bg-accent/90"
          onClick={() => setIsMinimized(false)}
        >
          Show App
        </Button>
      )}
      
      <DraggableWidget
        initialPosition={{ x: window.innerWidth - 300, y: window.innerHeight - 300 }}
        className="recorder-widget p-3 flex flex-col gap-3 z-50"
      >
        <ScreenRecorder />
      </DraggableWidget>
    </div>
  );
};

export default Index;
