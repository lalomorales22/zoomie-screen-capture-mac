
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, Pause, SkipBack, SkipForward, 
  Save, Share2, Download, Scissors,
  AudioLines, Volume2, Volume1, VolumeX
} from "lucide-react";

// Mock data
const mockSoundClips = [
  { id: 1, name: "Recording 1", duration: "00:45", waveform: Array(20).fill(0).map(() => Math.random() * 100) },
  { id: 2, name: "Voice Note", duration: "01:30", waveform: Array(20).fill(0).map(() => Math.random() * 100) },
  { id: 3, name: "Meeting Recording", duration: "15:20", waveform: Array(20).fill(0).map(() => Math.random() * 100) },
];

const SoundEditor = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(30);
  const [volume, setVolume] = useState(75);
  const [selectedEffect, setSelectedEffect] = useState('eq');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl blue-gradient-text">Sound Editor</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-muted/30 border-accent/30">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button className="bg-accent hover:bg-accent/90">
            <Save className="mr-2 h-4 w-4" />
            Save Project
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="glass-card p-6">
          <CardContent className="p-0 space-y-6">
            <div className="relative h-32 bg-muted/20 rounded-lg flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-24 flex items-center justify-center">
                  {mockSoundClips[0].waveform.map((height, i) => (
                    <div 
                      key={i} 
                      className="w-2 mx-0.5 bg-accent/70"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
              <div 
                className="absolute h-full w-0.5 bg-accent" 
                style={{ left: `${currentPosition}%` }}
              ></div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">00:00:15</div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    size="icon"
                    className="bg-accent hover:bg-accent/90 h-10 w-10 rounded-full"
                  >
                    {isPlaying ? 
                      <Pause className="h-5 w-5" /> : 
                      <Play className="h-5 w-5 ml-0.5" />
                    }
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">00:03:45</div>
              </div>

              <Slider 
                defaultValue={[currentPosition]} 
                max={100} 
                step={1} 
                onValueChange={([value]) => setCurrentPosition(value)} 
                className="cursor-pointer"
              />

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  {volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : volume < 50 ? (
                    <Volume1 className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Slider 
                  defaultValue={[volume]} 
                  max={100} 
                  step={1}
                  className="w-24" 
                  onValueChange={([value]) => setVolume(value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue={selectedEffect} onValueChange={setSelectedEffect}>
              <TabsList className="bg-muted/30 w-fit">
                <TabsTrigger value="eq">Equalizer</TabsTrigger>
                <TabsTrigger value="fx">Effects</TabsTrigger>
                <TabsTrigger value="filter">Filters</TabsTrigger>
              </TabsList>
              
              <TabsContent value="eq" className="mt-4 glass-card p-6">
                <div className="grid grid-cols-5 gap-4">
                  {['60Hz', '150Hz', '400Hz', '1KHz', '2.5KHz', '6KHz', '12KHz'].slice(0, 5).map((freq, i) => (
                    <div key={freq} className="flex flex-col items-center gap-2">
                      <Slider
                        defaultValue={[Math.random() * 50 + 25]}
                        max={100}
                        step={1}
                        orientation="vertical"
                        className="h-32"
                      />
                      <span className="text-xs">{freq}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="fx" className="mt-4 glass-card p-6">
                <div className="grid grid-cols-3 gap-4">
                  {['Reverb', 'Echo', 'Chorus', 'Delay', 'Distortion', 'Compressor'].map(effect => (
                    <Button 
                      key={effect} 
                      variant="outline" 
                      className="justify-start bg-muted/20 border-accent/20"
                    >
                      <AudioLines className="mr-2 h-4 w-4" />
                      {effect}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="filter" className="mt-4 glass-card p-6">
                <div className="grid grid-cols-2 gap-4">
                  {['Noise Reduction', 'Remove Background', 'Enhance Voice', 'Low Pass'].map(filter => (
                    <Button 
                      key={filter} 
                      variant="outline" 
                      className="justify-start bg-muted/20 border-accent/20"
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <h3 className="text-lg mb-4">Tools</h3>
            <div className="glass-card p-6 space-y-4">
              <Button variant="outline" className="w-full justify-start bg-muted/20">
                <Scissors className="mr-2 h-4 w-4" />
                Cut Selection
              </Button>
              <Button variant="outline" className="w-full justify-start bg-muted/20">
                <AudioLines className="mr-2 h-4 w-4" />
                Normalize Audio
              </Button>
              <Button variant="outline" className="w-full justify-start bg-muted/20">
                Fade In/Out
              </Button>
              <Button className="w-full bg-accent hover:bg-accent/90">
                <Download className="mr-2 h-4 w-4" />
                Export Audio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundEditor;
