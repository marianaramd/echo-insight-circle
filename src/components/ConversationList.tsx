
import React from "react";
import Message, { MessageProps } from "./Message";

interface ConversationListProps {
  messages: MessageProps[];
}

const ConversationList: React.FC<ConversationListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto py-4 px-2">
      {messages.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>No messages yet. Start a conversation!</p>
        </div>
      ) : (
        messages.map((message, index) => (
          <Message
            key={index}
            content={message.content}
            sender={message.sender}
            timestamp={message.timestamp}
          />
        ))
      )}
    </div>
  );
};

export default ConversationList;
