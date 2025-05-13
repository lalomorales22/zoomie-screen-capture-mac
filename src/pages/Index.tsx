
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Minimize2, X, Minus } from "lucide-react";
import ScreenRecorder from '@/components/ScreenRecorder';
import VideoGallery from '@/components/VideoGallery';
import VideoEditor from '@/components/VideoEditor';
import VideoCreator from '@/components/VideoCreator';
import SoundEditor from '@/components/SoundEditor';
import SoundCreator from '@/components/SoundCreator';
import Dashboard from '@/components/Dashboard';
import DraggableWidget from '@/components/DraggableWidget';

const Index = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden p-6 flex items-center justify-center">
      <div className="app-window rounded-xl border border-border/30 shadow-2xl backdrop-blur-sm overflow-hidden flex flex-col w-[95vw] h-[90vh]">
        <div className="window-titlebar flex items-center justify-between p-3 bg-muted/30 border-b border-border/30">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <h2 className="text-sm font-medium ml-2">Screen Recorder Pro</h2>
          </div>
          <div className="flex gap-2">
            <Button 
              className="h-6 w-6 p-0"
              size="icon"
              variant="ghost"
              onClick={() => setIsMinimized(true)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Button 
              className="h-6 w-6 p-0"
              size="icon" 
              variant="ghost"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {!isMinimized && (
          <div className="window-content flex-1 overflow-auto p-6 pb-24">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-extrabold blue-gradient-text">
                Screen Recorder Pro
              </h1>
            </div>
            
            <Tabs defaultValue="gallery" className="w-full">
              <TabsList className="bg-muted/30 w-fit mb-6">
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="editor">Video Editor</TabsTrigger>
                <TabsTrigger value="creator">Video Creator</TabsTrigger>
                <TabsTrigger value="sound-editor">Sound Editor</TabsTrigger>
                <TabsTrigger value="sound-creator">Sound Creator</TabsTrigger>
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
              
              <TabsContent value="sound-editor" className="mt-0">
                <SoundEditor />
              </TabsContent>
              
              <TabsContent value="sound-creator" className="mt-0">
                <SoundCreator />
              </TabsContent>
              
              <TabsContent value="dashboard" className="mt-0">
                <Dashboard />
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {isMinimized && (
          <div className="flex-1 flex items-center justify-center">
            <Button
              className="bg-accent hover:bg-accent/90"
              onClick={() => setIsMinimized(false)}
            >
              Show App
            </Button>
          </div>
        )}
      </div>
      
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
