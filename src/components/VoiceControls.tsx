
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface VoiceControlsProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  onStartListening,
  onStopListening,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 my-4">
      <Button
        onClick={onStartListening}
        disabled={isListening}
        className="flex items-center gap-2"
        variant={isListening ? "outline" : "default"}
      >
        <Mic className="h-4 w-4" />
        Start talking with Maggie
      </Button>
      
      <Button
        onClick={onStopListening}
        disabled={!isListening}
        variant={!isListening ? "outline" : "destructive"}
        className="flex items-center gap-2"
      >
        <MicOff className="h-4 w-4" />
        Stop talking with Maggie
      </Button>
    </div>
  );
};

export default VoiceControls;
