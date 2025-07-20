
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import StarRating from "./StarRating";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ open, onOpenChange }) => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  const valid = rating > 0 && /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;

    setSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Thank you for your feedback!",
        description: `You gave ${rating} star${rating !== 1 ? 's' : ''}.`,
      });
      setSubmitting(false);
      setMessage("");
      setEmail("");
      setRating(0);
      setTouched(false);
      onOpenChange(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-stravesta-navy text-stravesta-lightGray border-stravesta-teal/30 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center">
            <Button 
              onClick={() => onOpenChange(false)}
              variant="ghost"
              className="text-stravesta-teal hover:text-stravesta-teal/80 hover:bg-stravesta-teal/10 p-2 mr-2 -ml-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <DialogTitle className="text-white">Give Feedback</DialogTitle>
              <DialogDescription className="text-stravesta-lightGray">
                Rate us and share your experience.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              How satisfied are you? *
            </label>
            <StarRating 
              rating={rating} 
              onRatingChange={setRating} 
              disabled={submitting}
            />
            {touched && rating === 0 && (
              <div className="text-sm text-red-400 mt-1">Please give a rating.</div>
            )}
          </div>
          
          <Input
            placeholder="Your email (for follow-up, required)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            disabled={submitting}
            required
            className="bg-stravesta-darkGray border-stravesta-teal/30 text-white placeholder:text-stravesta-lightGray focus-visible:ring-stravesta-teal/40"
          />
          
          <Textarea
            placeholder="Additional comments (optional)..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            disabled={submitting}
            className="bg-stravesta-darkGray border-stravesta-teal/30 text-white placeholder:text-stravesta-lightGray focus-visible:ring-stravesta-teal/40"
          />
          
          {touched && !/\S+@\S+\.\S+/.test(email) && (
            <div className="text-sm text-red-400">Please enter a valid email.</div>
          )}
          
          <DialogFooter>
            <Button type="submit" disabled={!valid || submitting} className="w-full bg-stravesta-teal text-black hover:bg-stravesta-teal/90 font-semibold">
              {submitting ? "Sending..." : "Submit Feedback"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
