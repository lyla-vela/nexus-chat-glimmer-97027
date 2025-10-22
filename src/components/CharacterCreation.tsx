import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CharacterCreationProps {
  onCharacterCreated: (session: any) => void;
}

const CLASSES = [
  "Barbarian", "Bard", "Cleric", "Druid", "Fighter",
  "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer",
  "Warlock", "Wizard"
];

const CharacterCreation = ({ onCharacterCreated }: CharacterCreationProps) => {
  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("game_sessions")
        .insert({
          user_id: user.id,
          character_name: name,
          character_class: characterClass,
        })
        .select()
        .single();

      if (error) throw error;

      // Create initial system message
      await supabase.from("chat_messages").insert({
        session_id: data.id,
        role: "system",
        content: `A new adventure begins with ${name} the ${characterClass}...`,
      });

      toast({
        title: "Character created!",
        description: "Your adventure begins now.",
      });

      onCharacterCreated(data);
    } catch (error: any) {
      toast({
        title: "Error creating character",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Create Your Character</h1>
          <p className="text-muted-foreground">
            Who will you be in this adventure?
          </p>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Character Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Aragorn, Gandalf, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Select value={characterClass} onValueChange={setCharacterClass} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose your class" />
              </SelectTrigger>
              <SelectContent>
                {CLASSES.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={loading || !characterClass}>
            {loading ? "Creating..." : "Begin Adventure"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CharacterCreation;