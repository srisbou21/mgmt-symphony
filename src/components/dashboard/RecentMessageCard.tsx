import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { MessageList } from "@/components/messages/MessageList";
import { Message } from "@/types/message";

interface RecentMessageCardProps {
  messages: Message[];
}

export const RecentMessageCard = ({ messages }: RecentMessageCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Messages récents</h2>
        <Button variant="outline" size="sm" onClick={() => window.location.href = '/messages'}>
          <Mail className="w-4 h-4 mr-2" />
          Voir tous
        </Button>
      </div>
      <MessageList messages={messages} onMessageSelect={() => {}} />
    </Card>
  );
};