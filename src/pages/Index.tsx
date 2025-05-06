
import React, { useState, useEffect } from "react";
import AnimatedCircle from "@/components/AnimatedCircle";
import ConversationList from "@/components/ConversationList";
import MessageInput from "@/components/MessageInput";
import InsightPanel from "@/components/InsightPanel";
import { MessageProps } from "@/components/Message";
import { Separator } from "@/components/ui/separator";

const sampleMessages: MessageProps[] = [
  {
    content: "Hello! I'm Echo Insight. How can I help you today?",
    sender: "ai",
    timestamp: "Today, 10:05 AM",
  },
  {
    content: "I was wondering what can I upload?",
    sender: "user",
    timestamp: "Today, 10:06 AM",
  },
  {
    content: "Could you clarify which app or platform you are asking about for uploads?",
    sender: "ai",
    timestamp: "Today, 10:06 AM",
  },
  {
    content: "Like, here, it says upload. Upload what?",
    sender: "user",
    timestamp: "Today, 10:07 AM",
  },
  {
    content: "You can upload text documents, notes, or any relevant files that you want to work on within the Echo Insight app. You can chat with our support team using the chat bubble in Settings for additional help.",
    sender: "ai",
    timestamp: "Today, 10:07 AM",
  },
];

const sampleInsights = [
  "User is seeking clarification about upload functionality",
  "User appears to be new to the platform interface",
  "User's questions focus on basic platform features"
];

const sampleTopics = [
  "File Uploads", 
  "Platform Features", 
  "User Guidance"
];

const Index = () => {
  const [messages, setMessages] = useState<MessageProps[]>(sampleMessages);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState("The conversation revolves around clarifying upload functionality within the platform. The user appears to be new and is seeking guidance on basic features.");
  const [insights, setInsights] = useState<string[]>(sampleInsights);
  const [topics, setTopics] = useState<string[]>(sampleTopics);

  const handleSendMessage = (content: string) => {
    // Add user message
    const newUserMessage: MessageProps = {
      content,
      sender: "user",
      timestamp: `Today, ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`,
    };
    
    setMessages([...messages, newUserMessage]);
    
    // Start AI response simulation
    setIsListening(true);
    
    // Simulate AI thinking process
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate AI response
      setTimeout(() => {
        setIsProcessing(false);
        
        // Generate AI response based on user input
        let aiResponse = "I'm not sure I understand. Could you please elaborate?";
        
        if (content.toLowerCase().includes("hello") || content.toLowerCase().includes("hi")) {
          aiResponse = "Hello! How can I assist you today?";
        } else if (content.toLowerCase().includes("help")) {
          aiResponse = "I'm here to help! What would you like to know about our platform?";
        } else if (content.toLowerCase().includes("feature") || content.toLowerCase().includes("do")) {
          aiResponse = "Echo Insight can analyze conversations, provide summaries, extract key insights, and help you make better decisions based on your discussions.";
        } else {
          aiResponse = "Thank you for your message. I'm analyzing your input to provide the best possible assistance.";
        }
        
        const newAiMessage: MessageProps = {
          content: aiResponse,
          sender: "ai",
          timestamp: `Today, ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`,
        };
        
        setMessages((prevMessages) => [...prevMessages, newAiMessage]);
        
        // Update insights and topics based on new message
        if (messages.length > 5) {
          // Add a new insight
          setInsights((prev) => [
            ...prev,
            `User is interested in ${content.split(" ")[0].toLowerCase()} related topics`,
          ]);
          
          // Add a new topic
          const potentialTopic = content.split(" ").filter(word => word.length > 4)[0];
          if (potentialTopic && !topics.includes(potentialTopic)) {
            setTopics((prev) => [...prev, potentialTopic]);
          }
        }
      }, 1500);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background overflow-hidden">
      {/* Main Content - Circle and Conversation */}
      <div className="flex flex-col items-center justify-center flex-1 p-4 md:p-6 overflow-hidden">
        {/* Circle Animation Area */}
        <div className="mb-8 mt-8 flex items-center justify-center">
          <AnimatedCircle isListening={isListening} isProcessing={isProcessing} />
        </div>

        {/* Status Text */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-medium">
            {isListening 
              ? "Listening..." 
              : isProcessing 
                ? "Processing..." 
                : "Poised"}
          </h2>
        </div>
        
        {/* Conversation Container */}
        <div className="w-full max-w-3xl h-96 border border-border rounded-lg flex flex-col bg-secondary/10 backdrop-blur-sm overflow-hidden">
          <ConversationList messages={messages} />
          <MessageInput 
            onSendMessage={handleSendMessage} 
            disabled={isListening || isProcessing} 
          />
        </div>
      </div>

      {/* Right Sidebar - Insights and Summary */}
      <div className="w-full md:w-[350px] border-t md:border-t-0 md:border-l border-border p-4 overflow-y-auto bg-secondary/5">
        <h2 className="text-xl font-medium mb-4">Analysis</h2>
        <InsightPanel 
          summary={summary}
          insights={insights} 
          topics={topics} 
        />
      </div>
    </div>
  );
};

export default Index;
