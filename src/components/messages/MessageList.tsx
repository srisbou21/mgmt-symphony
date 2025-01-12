import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Message } from "@/types/message";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  onMessageSelect: (message: Message) => void;
}

export const MessageList = ({ messages, onMessageSelect }: MessageListProps) => {
  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-2 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
              !message.read ? "bg-blue-50" : ""
            }`}
            onClick={() => onMessageSelect(message)}
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
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};