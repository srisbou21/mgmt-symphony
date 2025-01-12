import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MessageList } from "@/components/messages/MessageList";
import { ComposeMessage } from "@/components/messages/ComposeMessage";
import { Button } from "@/components/ui/button";
import { Mail, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Message } from "@/types/message";
import { useAuth } from "@/contexts/AuthContext";

const MessagesPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const handleSendMessage = (values: any) => {
    const newMessage: Message = {
      id: Math.random(),
      senderId: user?.id || 0,
      receiverId: values.receiverId,
      subject: values.subject,
      content: values.content,
      createdAt: new Date().toISOString(),
      read: false,
    };

    setMessages([newMessage, ...messages]);
    setIsComposeOpen(false);
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès.",
    });
  };

  const handleMessageSelect = (message: Message) => {
    const updatedMessages = messages.map((m) =>
      m.id === message.id ? { ...m, read: true } : m
    );
    setMessages(updatedMessages);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
            <Mail className="w-4 h-4 mr-2" />
            Messages
          </div>
          <Button onClick={() => setIsComposeOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Nouveau message
          </Button>
        </div>

        <MessageList messages={messages} onMessageSelect={handleMessageSelect} />

        <ComposeMessage
          isOpen={isComposeOpen}
          onClose={() => setIsComposeOpen(false)}
          onSubmit={handleSendMessage}
          users={[]} // À remplacer par la liste réelle des utilisateurs
        />
      </div>
    </Layout>
  );
};

export default MessagesPage;