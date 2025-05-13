
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MicIcon, Play, Pause, Plus, Save, 
  Music, AudioLines, Layers, Share2,
  BookMusic, FileAudio
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

// Mock data for sound clips
const soundCategories = [
  {
    name: "Voice Recordings",
    clips: [
      { id: 1, name: "Narration 1", duration: "01:25" },
      { id: 2, name: "Interview", duration: "05:32" },
      { id: 3, name: "Voiceover", duration: "00:45" },
    ]
  },
  {
    name: "Sound Effects",
    clips: [
      { id: 4, name: "Notification", duration: "00:03" },
      { id: 5, name: "Applause", duration: "00:15" },
      { id: 6, name: "Whoosh", duration: "00:02" },
    ]
  },
  {
    name: "Music",
    clips: [
      { id: 7, name: "Background 1", duration: "02:30" },
      { id: 8, name: "Upbeat Intro", duration: "01:45" },
      { id: 9, name: "Outro", duration: "01:15" },
    ]
  }
];

const SoundCreator = () => {
  const [timeline, setTimeline] = useState([
    { id: 1, name: "Narration 1", track: 1, start: 10, width: 120, color: "bg-blue-500/50" },
    { id: 4, name: "Notification", track: 2, start: 50, width: 40, color: "bg-green-500/50" },
    { id: 7, name: "Background 1", track: 3, start: 0, width: 200, color: "bg-purple-500/50" }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl blue-gradient-text">Sound Creator</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-muted/30 border-accent/30"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button className="bg-accent hover:bg-accent/90">
            <Save className="mr-2 h-4 w-4" />
            Save Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Timeline */}
          <Card className="glass-card p-4">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <Play className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <Pause className="h-4 w-4" />
                </Button>
                <span className="text-sm ml-2">00:00:00</span>
              </div>

              {/* Timeline ruler */}
              <div className="h-8 border-b border-border/30 relative">
                {Array(10).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute bottom-0 border-l border-border/30 h-2"
                    style={{ left: `${i * 10}%` }}
                  >
                    <div className="absolute -left-3 -top-5 text-xs">
                      {i}s
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline tracks */}
              <div className="space-y-2">
                {[1, 2, 3].map(trackNumber => (
                  <div key={trackNumber} className="h-12 bg-muted/10 rounded-md relative">
                    <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center text-xs bg-muted/20 border-r border-border/20 rounded-l-md">
                      {trackNumber}
                    </div>
                    
                    {/* Clips on this track */}
                    {timeline
                      .filter(clip => clip.track === trackNumber)
                      .map(clip => (
                        <div 
                          key={clip.id} 
                          className={`absolute top-1 bottom-1 rounded-md ${clip.color} border border-white/10 flex items-center px-2 cursor-move`}
                          style={{ 
                            left: `${clip.start + 32}px`, 
                            width: `${clip.width}px` 
                          }}
                        >
                          <span className="text-xs truncate">{clip.name}</span>
                        </div>
                      ))
                    }
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-1" /> Add Track
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mixer */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <h3 className="text-lg mb-4">Mixer</h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(track => (
                  <div key={track} className="flex flex-col items-center space-y-2">
                    <span className="text-sm">Track {track}</span>
                    <Slider
                      defaultValue={[70]}
                      max={100}
                      step={1}
                      orientation="vertical"
                      className="h-32"
                    />
                    <span className="text-xs">70%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="clips">
            <TabsList className="w-full bg-muted/30">
              <TabsTrigger value="clips" className="flex-1">
                <FileAudio className="h-4 w-4 mr-2" />
                Sound Clips
              </TabsTrigger>
              <TabsTrigger value="record" className="flex-1">
                <MicIcon className="h-4 w-4 mr-2" />
                Record
              </TabsTrigger>
            </TabsList>

            <TabsContent value="clips" className="mt-4">
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="max-h-[500px] overflow-y-auto p-4">
                    {soundCategories.map(category => (
                      <div key={category.name} className="mb-6">
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          {category.name === "Voice Recordings" && <MicIcon className="h-4 w-4 mr-1" />}
                          {category.name === "Sound Effects" && <AudioLines className="h-4 w-4 mr-1" />}
                          {category.name === "Music" && <Music className="h-4 w-4 mr-1" />}
                          {category.name}
                        </h3>
                        <div className="space-y-2">
                          {category.clips.map(clip => (
                            <div 
                              key={clip.id} 
                              className="p-2 rounded bg-muted/20 hover:bg-muted/30 transition-colors flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center">
                                <Button size="icon" variant="ghost" className="h-6 w-6">
                                  <Play className="h-3 w-3" />
                                </Button>
                                <span className="text-sm">{clip.name}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-xs text-muted-foreground mr-2">{clip.duration}</span>
                                <Button size="icon" variant="ghost" className="h-6 w-6">
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="record" className="mt-4">
              <Card className="glass-card p-4">
                <CardContent className="p-0 flex flex-col items-center justify-center space-y-4 h-72">
                  <div className="w-24 h-24 rounded-full bg-muted/20 border border-accent flex items-center justify-center">
                    <MicIcon className="h-10 w-10 text-accent" />
                  </div>
                  <Button className="bg-accent hover:bg-accent/90 rounded-full px-6">
                    Start Recording
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Click to record a new sound clip
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <h3 className="text-lg mb-4">Project Settings</h3>
            <Card className="glass-card p-4">
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Quality</span>
                  <span className="text-sm">High (192kbps)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Format</span>
                  <span className="text-sm">MP3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Channels</span>
                  <span className="text-sm">Stereo</span>
                </div>
                <Button className="w-full bg-accent/20 hover:bg-accent/30 text-accent">
                  <Layers className="mr-2 h-4 w-4" />
                  Export Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundCreator;
