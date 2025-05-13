
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import RecordingControls from './RecordingControls';
import AreaSelector from './AreaSelector';
import VideoPreview from './VideoPreview';
import { recordingService, VideoData, RecordingOptions } from '@/services/RecordingService';

const ScreenRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAreaSelectionActive, setIsAreaSelectionActive] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerInterval !== null) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  const startTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
    }

    const interval = window.setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    setTimerInterval(interval);
  };

  const stopTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const resetRecordingState = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    stopTimer();
  };

  const handleStartRecording = async (options: RecordingOptions) => {
    try {
      const stream = await recordingService.getDisplayMedia(options);
      recordingService.startRecording(stream);
      setIsRecording(true);
      startTimer();
      toast({
        title: "Recording started",
        description: "Your screen is now being recorded."
      });
    } catch (error) {
      toast({
        title: "Recording failed",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  };

  const handleStopRecording = async () => {
    try {
      const data = await recordingService.stopRecording();
      setVideoData(data);
      setShowPreview(true);
      resetRecordingState();
      toast({
        title: "Recording completed",
        description: "Your recording has been processed."
      });
    } catch (error) {
      toast({
        title: "Error stopping recording",
        description: (error as Error).message,
        variant: "destructive"
      });
      resetRecordingState();
    }
  };

  const handleSaveRecording = () => {
    if (!videoData) return;
    
    // In a browser context, trigger download
    const a = document.createElement('a');
    a.href = videoData.url;
    a.download = `screen-recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    setShowPreview(false);
    setVideoData(null);
    toast({
      title: "Recording saved",
      description: "Your recording has been saved successfully."
    });
  };

  const handleDiscardRecording = () => {
    if (videoData) {
      URL.revokeObjectURL(videoData.url);
      setVideoData(null);
    }
    setShowPreview(false);
    toast({
      description: "Recording discarded"
    });
  };

  const handleAreaSelected = (area: { x: number; y: number; width: number; height: number }) => {
    setIsAreaSelectionActive(false);
    
    // In a real app, this would use native APIs to capture a specific screen area
    // For this demo, we'll just simulate it by capturing the entire screen
    const options: RecordingOptions = {
      audio: audioEnabled,
      video: {
        displaySurface: 'monitor',
        width: area.width,
        height: area.height,
        frameRate: 30,
        cursorDisplay: 'always'
      }
    };
    
    handleStartRecording(options);
  };

  const handleSelectArea = () => {
    setIsAreaSelectionActive(true);
  };

  const handleSelectWindow = () => {
    const options: RecordingOptions = {
      audio: audioEnabled,
      video: {
        displaySurface: 'window',
        frameRate: 30,
        cursorDisplay: 'always'
      }
    };
    
    handleStartRecording(options);
  };

  const handleSelectFullScreen = () => {
    const options: RecordingOptions = {
      audio: audioEnabled,
      video: {
        displaySurface: 'monitor',
        frameRate: 30,
        cursorDisplay: 'always'
      }
    };
    
    handleStartRecording(options);
  };

  const handleToggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const handlePauseRecording = () => {
    if (isRecording && !isPaused) {
      recordingService.pauseRecording();
      setIsPaused(true);
      stopTimer();
      toast({
        description: "Recording paused"
      });
    }
  };

  const handleResumeRecording = () => {
    if (isRecording && isPaused) {
      recordingService.resumeRecording();
      setIsPaused(false);
      startTimer();
      toast({
        description: "Recording resumed"
      });
    }
  };

  const handleZoomIn = () => {
    recordingService.increaseZoom();
    toast({
      description: `Zoomed to ${recordingService.getZoomFactor()}x`
    });
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40 shadow-2xl">
        <RecordingControls
          isRecording={isRecording}
          isPaused={isPaused}
          audioEnabled={audioEnabled}
          onStartRecording={handleSelectArea} // Default to area selection
          onPauseRecording={handlePauseRecording}
          onResumeRecording={handleResumeRecording}
          onStopRecording={handleStopRecording}
          onSelectArea={handleSelectArea}
          onSelectWindow={handleSelectWindow}
          onSelectFullScreen={handleSelectFullScreen}
          onToggleAudio={handleToggleAudio}
          onZoomIn={handleZoomIn}
          recordingTime={recordingTime}
        />
      </div>

      <AreaSelector
        isActive={isAreaSelectionActive}
        onAreaSelected={handleAreaSelected}
        onCancel={() => setIsAreaSelectionActive(false)}
      />

      <VideoPreview
        videoData={videoData}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onSave={handleSaveRecording}
        onDiscard={handleDiscardRecording}
      />
    </>
  );
};

export default ScreenRecorder;
