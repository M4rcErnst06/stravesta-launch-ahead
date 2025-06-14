
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Users, MessageSquare, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ChatGroup {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
}

interface ChatGroupListProps {
  groups: ChatGroup[];
  onGroupSelect: (group: ChatGroup) => void;
}

const ChatGroupList: React.FC<ChatGroupListProps> = ({ groups, onGroupSelect }) => {
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>({});
  const [userMemberships, setUserMemberships] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchMemberCounts();
    fetchUserMemberships();
  }, [groups]);

  const fetchMemberCounts = async () => {
    const counts: Record<string, number> = {};
    
    for (const group of groups) {
      const { count } = await supabase
        .from('chat_group_members')
        .select('*', { count: 'exact', head: true })
        .eq('group_id', group.id);
      
      counts[group.id] = count || 0;
    }
    
    setMemberCounts(counts);
  };

  const fetchUserMemberships = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from('chat_group_members')
      .select('group_id')
      .eq('user_id', session.user.id);

    const memberships = new Set(data?.map(m => m.group_id) || []);
    setUserMemberships(memberships);
  };

  const handleJoinGroup = async (groupId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from('chat_group_members')
      .insert({
        group_id: groupId,
        user_id: session.user.id
      });

    if (error) {
      toast({
        title: "Fehler",
        description: "Konnte der Gruppe nicht beitreten.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Erfolgreich beigetreten",
      description: "Sie sind der Gruppe beigetreten!",
    });

    fetchMemberCounts();
    fetchUserMemberships();
  };

  const handleEnterGroup = async (group: ChatGroup) => {
    const isMember = userMemberships.has(group.id);
    
    if (!isMember) {
      await handleJoinGroup(group.id);
      // Refresh membership status
      await fetchUserMemberships();
    }
    
    onGroupSelect(group);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => {
        const isMember = userMemberships.has(group.id);
        const memberCount = memberCounts[group.id] || 0;
        
        return (
          <Card 
            key={group.id}
            className="bg-stravesta-navy/50 border-stravesta-teal/20 hover:border-stravesta-teal/40 transition-all duration-300 group hover:scale-105"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-stravesta-teal" />
                  {group.name}
                </CardTitle>
                {isMember && (
                  <Badge className="bg-stravesta-teal/10 text-stravesta-teal border-stravesta-teal/30">
                    Mitglied
                  </Badge>
                )}
              </div>
              <CardDescription className="text-stravesta-lightGray">
                {group.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-stravesta-lightGray">
                <Users className="h-4 w-4" />
                <span className="text-sm">{memberCount} Mitglieder</span>
              </div>
              
              <Button 
                onClick={() => handleEnterGroup(group)}
                className="w-full bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark group/btn"
              >
                {isMember ? 'Chat betreten' : 'Beitreten & Chat betreten'}
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ChatGroupList;
