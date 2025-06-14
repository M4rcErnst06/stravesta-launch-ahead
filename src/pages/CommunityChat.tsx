
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Users, MessageSquare } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import ChatGroupList from '@/components/chat/ChatGroupList';
import ChatRoom from '@/components/chat/ChatRoom';
import CreateGroupModal from '@/components/chat/CreateGroupModal';

interface ChatGroup {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
  member_count?: number;
}

const CommunityChat = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);
  const [groups, setGroups] = useState<ChatGroup[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchGroups();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
      return;
    }
    setUser(session.user);
  };

  const fetchGroups = async () => {
    try {
      const { data: groupsData, error } = await supabase
        .from('chat_groups')
        .select(`
          id,
          name,
          description,
          created_by,
          created_at
        `)
        .order('name');

      if (error) {
        console.error('Error fetching groups:', error);
        toast({
          title: "Fehler",
          description: "Konnte Chat-Gruppen nicht laden.",
          variant: "destructive",
        });
        return;
      }

      setGroups(groupsData || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupCreated = () => {
    fetchGroups();
    setShowCreateModal(false);
  };

  const handleGroupSelect = (group: ChatGroup) => {
    setSelectedGroup(group);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stravesta-dark flex items-center justify-center">
        <div className="text-white text-xl">Lädt Chat...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stravesta-dark bg-tech-pattern relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-stravesta-dark/90 pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-stravesta-navy/80 backdrop-blur-sm border-b border-stravesta-teal/20 sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="ghost"
                  size="sm"
                  className="text-stravesta-lightGray hover:text-white hover:bg-stravesta-navy"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-6 w-6 text-stravesta-teal" />
                  <h1 className="text-2xl font-bold text-gradient">
                    {selectedGroup ? selectedGroup.name : 'Community Chat'}
                  </h1>
                </div>
              </div>

              {!selectedGroup && (
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Gruppe erstellen
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 h-[calc(100vh-100px)]">
          {selectedGroup ? (
            <ChatRoom 
              group={selectedGroup} 
              user={user!}
              onBack={handleBackToGroups}
            />
          ) : (
            <div className="h-full">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">Chat-Gruppen</h2>
                <p className="text-stravesta-lightGray">
                  Wählen Sie eine Gruppe aus, um am Chat teilzunehmen.
                </p>
              </div>
              
              <ChatGroupList 
                groups={groups}
                onGroupSelect={handleGroupSelect}
              />
            </div>
          )}
        </main>

        {/* Create Group Modal */}
        <CreateGroupModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onGroupCreated={handleGroupCreated}
          userId={user?.id || ''}
        />
      </div>
    </div>
  );
};

export default CommunityChat;
