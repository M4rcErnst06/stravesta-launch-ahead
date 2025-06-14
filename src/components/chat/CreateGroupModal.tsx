
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGroupCreated: () => void;
  userId: string;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  onGroupCreated,
  userId
}) => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!groupName.trim()) {
      toast({
        title: "Fehler",
        description: "Gruppenname ist erforderlich.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Create the group
      const { data: groupData, error: groupError } = await supabase
        .from('chat_groups')
        .insert({
          name: groupName.trim(),
          description: description.trim() || null,
          created_by: userId
        })
        .select()
        .single();

      if (groupError) {
        console.error('Error creating group:', groupError);
        toast({
          title: "Fehler",
          description: "Gruppe konnte nicht erstellt werden.",
          variant: "destructive",
        });
        return;
      }

      // Add creator as member
      const { error: memberError } = await supabase
        .from('chat_group_members')
        .insert({
          group_id: groupData.id,
          user_id: userId
        });

      if (memberError) {
        console.error('Error adding creator as member:', memberError);
        // Don't show error to user, as group was created successfully
      }

      toast({
        title: "Erfolgreich erstellt",
        description: "Die Gruppe wurde erfolgreich erstellt!",
      });

      setGroupName('');
      setDescription('');
      onGroupCreated();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Fehler",
        description: "Ein unerwarteter Fehler ist aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setGroupName('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-stravesta-navy border-stravesta-teal/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Neue Chat-Gruppe erstellen</DialogTitle>
          <DialogDescription className="text-stravesta-lightGray">
            Erstellen Sie eine neue Chat-Gruppe für die Community.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groupName" className="text-white">
              Gruppenname *
            </Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="z.B. Day Trading Strategien"
              className="bg-stravesta-navy/50 border-stravesta-teal/20 text-white placeholder:text-stravesta-lightGray focus:border-stravesta-teal"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Beschreibung (Optional)
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Kurze Beschreibung der Gruppe..."
              className="bg-stravesta-navy/50 border-stravesta-teal/20 text-white placeholder:text-stravesta-lightGray focus:border-stravesta-teal"
            />
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="border-stravesta-teal/20 text-stravesta-lightGray hover:bg-stravesta-navy hover:text-white"
          >
            Abbrechen
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !groupName.trim()}
            className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark"
          >
            {loading ? 'Erstelle...' : 'Gruppe erstellen'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
