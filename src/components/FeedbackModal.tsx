
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ open, onOpenChange }) => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  const valid = message.trim().length > 0 && /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;

    setSubmitting(true);
    // Sende das Feedback z.B. an Supabase oder zeige als Demo einen Toast/Log
    // Hier nur Demo:
    setTimeout(() => {
      toast({
        title: "Vielen Dank für dein Feedback!",
        description: "Wir haben dein Feedback erhalten.",
      });
      setSubmitting(false);
      setMessage("");
      setEmail("");
      setTouched(false);
      onOpenChange(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Feedback geben</DialogTitle>
          <DialogDescription>
            Teile uns dein Anliegen, Feature-Wünsche oder Verbesserungsvorschläge mit.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Deine E-Mail (für Rückfragen, Pflichtfeld)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            disabled={submitting}
            required
          />
          <Textarea
            placeholder="Deine Nachricht an das Stravesta Team..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={6}
            disabled={submitting}
            required
          />
          {touched && !/\S+@\S+\.\S+/.test(email) && (
            <div className="text-sm text-red-500">Bitte gib eine gültige E-Mail an.</div>
          )}
          {touched && message.trim().length === 0 && (
            <div className="text-sm text-red-500">Bitte gib eine Nachricht ein.</div>
          )}
          <DialogFooter>
            <Button type="submit" disabled={!valid || submitting} className="w-full">
              {submitting ? "Sende..." : "Abschicken"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
