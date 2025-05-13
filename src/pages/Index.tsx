
import ScreenRecorder from '@/components/ScreenRecorder';

const Index = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-recorder-highlight via-recorder-accent to-recorder-control">
          Easy Screen Recorder
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Record any area of your screen with just a few clicks
        </p>
        
        <div className="bg-recorder rounded-lg p-6 shadow-xl border border-recorder-highlight/20 max-w-md mx-auto">
          <h2 className="text-xl font-medium mb-4 text-recorder-highlight">How to use:</h2>
          <ul className="text-left text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="text-recorder-accent mr-2">1.</span>
              <span>Choose a recording mode - Area, Window or Full Screen</span>
            </li>
            <li className="flex items-start">
              <span className="text-recorder-accent mr-2">2.</span>
              <span>Toggle audio recording if needed</span>
            </li>
            <li className="flex items-start">
              <span className="text-recorder-accent mr-2">3.</span>
              <span>Click "Start Recording" to begin</span>
            </li>
            <li className="flex items-start">
              <span className="text-recorder-accent mr-2">4.</span>
              <span>Use controls to pause, zoom in or stop recording</span>
            </li>
            <li className="flex items-start">
              <span className="text-recorder-accent mr-2">5.</span>
              <span>Preview your recording and save it</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full">
        <div className="bg-recorder/30 backdrop-blur-sm rounded-xl p-8 border border-recorder-highlight/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-recorder-highlight/5 to-recorder-accent/5"></div>
          <div className="relative z-10">
            <p className="text-center text-gray-400 mb-8">
              This is a browser-based screen recorder demonstration. In a real desktop application, the widget would float on top of all windows.
            </p>
            <div className="rounded-lg border-2 border-dashed border-gray-700 aspect-video flex items-center justify-center bg-black/30">
              <p className="text-gray-500 text-lg">Your screen content will appear here during recording</p>
            </div>
          </div>
        </div>
      </div>
      
      <ScreenRecorder />
    </div>
  );
};

export default Index;
