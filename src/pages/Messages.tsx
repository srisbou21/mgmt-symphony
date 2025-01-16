import { useState, useEffect } from "react";
import { ComposeMessage } from "@/components/messages/ComposeMessage";
import { MessageList } from "@/components/messages/MessageList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Message } from "@/types/message";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/user";
import { supabase } from "@/integrations/supabase/client";

export default function Messages() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setMessages(data as Message[]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages.",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async (values: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: values.receiverId,
          subject: values.subject,
          content: values.content,
          attachments: values.attachments,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setMessages(prev => [data as Message, ...prev]);
        setIsComposeOpen(false);
        toast({
          title: "Message envoyé",
          description: "Votre message a été envoyé avec succès.",
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message.",
        variant: "destructive",
      });
    }
  };

  const handleMessageSelect = async (message: Message) => {
    if (!message.read) {
      try {
        const { error } = await supabase
          .from('messages')
          .update({ read: true })
          .eq('id', message.id);

        if (error) throw error;

        setMessages(prev =>
          prev.map(msg =>
            msg.id === message.id ? { ...msg, read: true } : msg
          )
        );
      } catch (error) {
        console.error('Error updating message status:', error);
      }
    }
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