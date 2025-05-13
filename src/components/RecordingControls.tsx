
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Camera, Mic, MicOff, Monitor, ScreenShare, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecordingControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  audioEnabled: boolean;
  onStartRecording: () => void;
  onPauseRecording: () => void;
  onResumeRecording: () => void;
  onStopRecording: () => void;
  onSelectArea: () => void;
  onSelectWindow: () => void;
  onSelectFullScreen: () => void;
  onToggleAudio: () => void;
  onZoomIn: () => void;
  recordingTime: number;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  isPaused,
  audioEnabled,
  onStartRecording,
  onPauseRecording,
  onResumeRecording,
  onStopRecording,
  onSelectArea,
  onSelectWindow,
  onSelectFullScreen,
  onToggleAudio,
  onZoomIn,
  recordingTime
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TooltipProvider>
      <div className={cn(
        "recorder-widget p-3 flex flex-col gap-3",
        isRecording ? "min-w-[260px]" : ""
      )}>
        {!isRecording ? (
          <>
            <div className="text-lg font-medium mb-2">Screen Recorder</div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={onSelectArea} 
                      className="recorder-button flex flex-col items-center" 
                      variant="ghost"
                    >
                      <Camera className="h-5 w-5 text-recorder-highlight" />
                      <span className="text-xs mt-1">Area</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Select area to record</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={onSelectWindow} 
                      className="recorder-button flex flex-col items-center" 
                      variant="ghost"
                    >
                      <ScreenShare className="h-5 w-5 text-recorder-highlight" />
                      <span className="text-xs mt-1">Window</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Record window</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={onSelectFullScreen} 
                      className="recorder-button flex flex-col items-center" 
                      variant="ghost"
                    >
                      <Monitor className="h-5 w-5 text-recorder-highlight" />
                      <span className="text-xs mt-1">Full Screen</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Record full screen</TooltipContent>
                </Tooltip>
              </div>
              
              <div className="flex justify-between items-center px-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={onToggleAudio} 
                      className="recorder-button" 
                      variant="ghost"
                      size="icon"
                    >
                      {audioEnabled ? 
                        <Mic className="h-5 w-5 text-recorder-control" /> : 
                        <MicOff className="h-5 w-5 text-recorder-danger" />
                      }
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {audioEnabled ? "Disable audio" : "Enable audio"}
                  </TooltipContent>
                </Tooltip>
                <Button 
                  onClick={onStartRecording}
                  className="recorder-button-primary"
                >
                  Start Recording
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className={cn(
                  "w-3 h-3 rounded-full bg-recorder-danger mr-2",
                  !isPaused && "animate-pulse-recording"
                )}></div>
                <span className="font-medium">
                  {isPaused ? "Paused" : "Recording"}
                </span>
              </div>
              <div className="text-recorder-highlight font-mono">
                {formatTime(recordingTime)}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={onToggleAudio}
                      className="recorder-button" 
                      variant="ghost"
                      size="icon"
                    >
                      {audioEnabled ? 
                        <Mic className="h-5 w-5 text-recorder-control" /> : 
                        <MicOff className="h-5 w-5 text-recorder-danger" />
                      }
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {audioEnabled ? "Mute" : "Unmute"}
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={onZoomIn}
                      className="recorder-button" 
                      variant="ghost"
                      size="icon"
                    >
                      <ZoomIn className="h-5 w-5 text-recorder-highlight" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom in</TooltipContent>
                </Tooltip>
              </div>
              
              <div className="flex gap-2">
                {isPaused ? (
                  <Button
                    onClick={onResumeRecording}
                    className="recorder-button-control"
                    size="icon"
                  >
                    <div className="w-3 h-3 border-8 border-l-transparent border-t-transparent border-b-transparent border-r-recorder" />
                  </Button>
                ) : (
                  <Button
                    onClick={onPauseRecording}
                    className="recorder-button-control"
                    size="icon"
                  >
                    <div className="w-3 h-3 border-4 border-recorder" />
                  </Button>
                )}
                
                <Button
                  onClick={onStopRecording}
                  className="recorder-button-stop"
                  size="icon"
                >
                  <div className="w-3 h-3 bg-white" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </TooltipProvider>
  );
};

export default RecordingControls;
