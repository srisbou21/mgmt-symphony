import { useState } from "react";
import { ComposeMessage } from "@/components/messages/ComposeMessage";
import { MessageList } from "@/components/messages/MessageList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Message } from "@/types/message";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/user";

export default function Messages() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users] = useState<User[]>([
    { 
      id: 1, 
      username: "user1",
      role: "user",
      permissions: {
        canManageUsers: false,
        canManageEquipment: false,
        canManageMaintenance: false,
        canViewReports: false
      }
    },
    { 
      id: 2, 
      username: "user2",
      role: "user",
      permissions: {
        canManageUsers: false,
        canManageEquipment: false,
        canManageMaintenance: false,
        canViewReports: false
      }
    },
  ]);
  const { toast } = useToast();

  const handleSendMessage = (values: any) => {
    const newMessage: Message = {
      id: messages.length + 1,
      senderId: 1, // À remplacer par l'ID de l'utilisateur connecté
      receiverId: values.receiverId,
      subject: values.subject,
      content: values.content,
      read: false,
      createdAt: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setIsComposeOpen(false);
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès.",
    });
  };

  const handleMessageSelect = (message: Message) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === message.id ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <Button onClick={() => setIsComposeOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau message
        </Button>
      </div>

      <MessageList messages={messages} onMessageSelect={handleMessageSelect} />

      <ComposeMessage
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSubmit={handleSendMessage}
        users={users}
      />
    </div>
  );
}