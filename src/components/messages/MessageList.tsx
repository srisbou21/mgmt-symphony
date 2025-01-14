import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Message } from "@/types/message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageDetails } from "./MessageDetails";
import { Paperclip } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  onMessageSelect: (message: Message) => void;
}

export const MessageList = ({ messages, onMessageSelect }: MessageListProps) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleMessageClick = (message: Message) => {
    onMessageSelect(message);
    setSelectedMessage(message);
  };

  return (
    <>
      <ScrollArea className="h-[500px]">
        <div className="space-y-2 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                !message.read ? "bg-blue-50" : ""
              }`}
              onClick={() => handleMessageClick(message)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{message.subject}</h3>
                <span className="text-sm text-gray-500">
                  {format(new Date(message.createdAt), "d MMM yyyy HH:mm", {
                    locale: fr,
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{message.content}</p>
              {message.attachments && message.attachments.length > 0 && (
                <div className="flex items-center gap-1 mt-2 text-gray-500">
                  <Paperclip className="h-4 w-4" />
                  <span className="text-xs">{message.attachments.length} pièce(s) jointe(s)</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <MessageDetails
        message={selectedMessage}
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />
    </>
  );
};