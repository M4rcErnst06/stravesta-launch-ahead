
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { Send, ArrowLeft, Users } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface ChatGroup {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
}

interface ChatMessage {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    display_name: string | null;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
}

interface ChatRoomProps {
  group: ChatGroup;
  user: SupabaseUser;
  onBack: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ group, user, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `group_id=eq.${group.id}`
        },
        (payload) => {
          console.log('New message received:', payload);
          fetchMessages(); // Refresh messages when new one arrives
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [group.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          id,
          content,
          created_at,
          user_id,
          profiles (
            display_name,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('group_id', group.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: "Fehler",
          description: "Konnte Nachrichten nicht laden.",
          variant: "destructive",
        });
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          group_id: group.id,
          user_id: user.id,
          content: newMessage.trim()
        });

      if (error) {
        console.error('Error sending message:', error);
        toast({
          title: "Fehler",
          description: "Nachricht konnte nicht gesendet werden.",
          variant: "destructive",
        });
        return;
      }

      setNewMessage('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUserDisplayName = (message: ChatMessage) => {
    if (message.profiles?.display_name) {
      return message.profiles.display_name;
    }
    if (message.profiles?.first_name || message.profiles?.last_name) {
      return `${message.profiles.first_name || ''} ${message.profiles.last_name || ''}`.trim();
    }
    return 'Unbekannter Benutzer';
  };

  const getUserInitials = (message: ChatMessage) => {
    const displayName = getUserDisplayName(message);
    return displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-xl">Lädt Chat...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-stravesta-navy/50 rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-stravesta-lightGray hover:text-white hover:bg-stravesta-navy"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h3 className="text-xl font-semibold text-white">{group.name}</h3>
            <p className="text-stravesta-lightGray text-sm">{group.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-stravesta-lightGray">
          <Users className="h-4 w-4" />
          <span className="text-sm">{messages.length > 0 ? `${new Set(messages.map(m => m.user_id)).size} aktive Mitglieder` : 'Keine Nachrichten'}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-stravesta-navy/30 rounded-lg p-4 mb-4">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-stravesta-lightGray py-8">
                <p>Noch keine Nachrichten in dieser Gruppe.</p>
                <p className="text-sm mt-2">Seien Sie der Erste, der eine Nachricht schreibt!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="flex gap-3 group">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={message.profiles?.avatar_url || undefined} />
                    <AvatarFallback className="bg-stravesta-teal text-stravesta-dark text-xs font-semibold">
                      {getUserInitials(message)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-sm">
                        {getUserDisplayName(message)}
                      </span>
                      <span className="text-xs text-stravesta-lightGray">
                        {formatTime(message.created_at)}
                      </span>
                    </div>
                    <div className="bg-stravesta-navy/60 rounded-lg p-3 text-stravesta-lightGray break-words">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Message Input */}
      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nachricht eingeben..."
          className="flex-1 bg-stravesta-navy/50 border-stravesta-teal/20 text-white placeholder:text-stravesta-lightGray focus:border-stravesta-teal"
          disabled={sending}
        />
        <Button
          onClick={sendMessage}
          disabled={!newMessage.trim() || sending}
          className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark px-6"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatRoom;
