
import React from "react";
import { CircleDot } from "lucide-react";

export interface MessageProps {
  content: string;
  sender: "ai" | "user";
  timestamp?: string;
}

const Message: React.FC<MessageProps> = ({ content, sender, timestamp }) => {
  const isAi = sender === "ai";
  
  return (
    <div className={`flex items-start gap-3 mb-6 animate-fade-in`}>
      {/* Avatar or Icon */}
      <div className={`mt-1 flex-shrink-0 ${isAi ? "bg-echo-purple" : "bg-secondary"} rounded-full p-2`}>
        {isAi ? (
          <CircleDot className="w-5 h-5 text-white" />
        ) : (
          <div className="w-5 h-5 bg-white rounded-full"></div>
        )}
      </div>
      
      {/* Message Content */}
      <div className="flex-1">
        <div className={`p-4 rounded-2xl ${isAi ? "bg-secondary/50" : "bg-secondary/30"}`}>
          <p className="text-foreground">{content}</p>
        </div>
        
        {timestamp && (
          <div className="mt-1 text-xs text-muted-foreground">
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
