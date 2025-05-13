
export interface RecordingOptions {
  audio: boolean;
  video: {
    displaySurface: 'browser' | 'window' | 'monitor';
    width?: number;
    height?: number;
    frameRate?: number;
    cursorDisplay?: 'always' | 'never' | 'motion';
  };
}

export interface VideoData {
  blob: Blob;
  url: string;
  timestamp: number;
  duration: number;
}

class RecordingService {
  private mediaRecorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private recordedChunks: Blob[] = [];
  private startTime: number = 0;
  private zoomFactor: number = 1;

  // This would require actual desktop integration in a real app
  public async getDisplayMedia(options: RecordingOptions): Promise<MediaStream> {
    try {
      // In a browser context, this is how you'd request screen sharing
      // In a real desktop app, you'd use platform-specific APIs
      this.stream = await navigator.mediaDevices.getDisplayMedia({
        video: options.video,
        audio: options.audio
      });
      
      return this.stream;
    } catch (error) {
      console.error('Error accessing screen media:', error);
      throw new Error('Could not access screen recording. Please check permissions.');
    }
  }

  public startRecording(stream: MediaStream): void {
    if (this.mediaRecorder) {
      this.stopRecording();
    }

    this.recordedChunks = [];
    this.startTime = Date.now();

    try {
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(1000); // Collect data in 1-second chunks
    } catch (error) {
      console.error('Error starting recording:', error);
      throw new Error('Could not start recording.');
    }
  }

  public pauseRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
    }
  }

  public resumeRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
    }
  }

  public async stopRecording(): Promise<VideoData> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recording in progress'));
        return;
      }

      const duration = (Date.now() - this.startTime) / 1000; // Duration in seconds

      this.mediaRecorder.onstop = () => {
        try {
          const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          
          this.stopStream();
          
          resolve({
            blob,
            url,
            timestamp: this.startTime,
            duration
          });
        } catch (error) {
          reject(error);
        }
      };

      if (this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
      }
    });
  }

  private stopStream(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  public setZoomFactor(factor: number): void {
    this.zoomFactor = Math.max(1, Math.min(5, factor)); // Limit zoom between 1x and 5x
    // In a real app, this would apply zoom to the recording
  }

  public increaseZoom(): void {
    this.setZoomFactor(this.zoomFactor + 0.5);
  }

  public getZoomFactor(): number {
    return this.zoomFactor;
  }
}

export const recordingService = new RecordingService();
