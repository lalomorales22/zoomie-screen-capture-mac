
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VideoData } from '@/services/RecordingService';

interface VideoPreviewProps {
  videoData: VideoData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onDiscard: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoData,
  isOpen,
  onClose,
  onSave,
  onDiscard
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current && videoData) {
      videoRef.current.src = videoData.url;
    }
  }, [isOpen, videoData]);

  if (!videoData) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-recorder border-recorder-highlight/20">
        <DialogHeader>
          <DialogTitle className="text-recorder-foreground">Recording Preview</DialogTitle>
        </DialogHeader>
        
        <div className="relative rounded-md overflow-hidden bg-black">
          <video 
            ref={videoRef} 
            className="w-full h-auto" 
            controls 
            autoPlay
          />
        </div>
        
        <div className="text-sm text-recorder-foreground/80">
          Duration: {formatDuration(videoData.duration)}
        </div>
        
        <DialogFooter className="flex sm:justify-between gap-2">
          <Button 
            variant="outline" 
            onClick={onDiscard}
            className="border-recorder-danger text-recorder-danger hover:text-recorder-danger hover:bg-recorder-danger/10"
          >
            Discard
          </Button>
          
          <Button 
            onClick={onSave}
            className="bg-recorder-control text-black hover:bg-recorder-control/90"
          >
            Save Recording
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPreview;
