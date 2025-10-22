import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dices } from "lucide-react";

interface DiceRollerProps {
  sessionId: string;
}

const DICE_TYPES = [
  { sides: 4, label: "d4" },
  { sides: 6, label: "d6" },
  { sides: 8, label: "d8" },
  { sides: 10, label: "d10" },
  { sides: 12, label: "d12" },
  { sides: 20, label: "d20" },
  { sides: 100, label: "d100" },
];

const DiceRoller = ({ sessionId }: DiceRollerProps) => {
  const [rolling, setRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<{ dice: string; result: number } | null>(null);
  const { toast } = useToast();

  const rollDice = async (sides: number, label: string) => {
    setRolling(true);
    
    // Simulate dice roll animation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = Math.floor(Math.random() * sides) + 1;
    setLastRoll({ dice: label, result });

    // Post to chat
    try {
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: `🎲 Rolled ${label}: **${result}**`,
      });

      if (result === sides) {
        toast({
          title: "Critical Success!",
          description: `Natural ${sides}!`,
        });
      } else if (result === 1 && sides === 20) {
        toast({
          title: "Critical Failure!",
          description: "Natural 1...",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setRolling(false);
    }
  };

  return (
    <Card className="p-6 h-full overflow-y-auto space-y-6 bg-card/50 backdrop-blur-sm">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Dices className="w-5 h-5" />
          <h2 className="text-xl font-bold">Dice Roller</h2>
        </div>
        {lastRoll && (
          <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="text-sm text-muted-foreground">{lastRoll.dice}</div>
            <div className="text-4xl font-bold">{lastRoll.result}</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {DICE_TYPES.map(({ sides, label }) => (
          <Button
            key={sides}
            onClick={() => rollDice(sides, label)}
            disabled={rolling}
            variant="outline"
            className="h-16 text-lg font-semibold hover:scale-105 transition-transform"
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Click any die to roll. Results are automatically posted to the adventure log.
        </p>
      </div>
    </Card>
  );
};

export default DiceRoller;