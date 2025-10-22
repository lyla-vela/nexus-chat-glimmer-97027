import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Zap, Shield, Sword } from "lucide-react";

interface CharacterSheetProps {
  session: any;
  onUpdate: (session: any) => void;
}

const CharacterSheet = ({ session }: CharacterSheetProps) => {
  const stats = session.character_stats as Record<string, number>;
  const hpPercentage = (session.character_hp / session.character_max_hp) * 100;

  return (
    <Card className="p-6 h-full overflow-y-auto space-y-6 bg-card/50 backdrop-blur-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{session.character_name}</h2>
        <div className="flex gap-2">
          <Badge variant="secondary">{session.character_class}</Badge>
          <Badge variant="outline">Level {session.character_level}</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Heart className="w-4 h-4 text-destructive" />
            Hit Points
          </div>
          <span className="text-sm font-bold">
            {session.character_hp} / {session.character_max_hp}
          </span>
        </div>
        <Progress value={hpPercentage} className="h-2" />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Ability Scores
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(stats).map(([stat, value]) => {
            const modifier = Math.floor((value - 10) / 2);
            const modifierStr = modifier >= 0 ? `+${modifier}` : modifier;
            
            return (
              <Card key={stat} className="p-3 bg-background/50">
                <div className="text-xs uppercase text-muted-foreground mb-1">
                  {stat}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{value}</span>
                  <span className="text-sm text-muted-foreground">
                    ({modifierStr})
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Combat Stats
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded bg-background/50">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4" />
              Armor Class
            </div>
            <span className="font-bold">
              {10 + Math.floor((stats.dexterity - 10) / 2)}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-background/50">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              Initiative
            </div>
            <span className="font-bold">
              {Math.floor((stats.dexterity - 10) / 2) >= 0 
                ? `+${Math.floor((stats.dexterity - 10) / 2)}` 
                : Math.floor((stats.dexterity - 10) / 2)}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-background/50">
            <div className="flex items-center gap-2 text-sm">
              <Sword className="w-4 h-4" />
              Proficiency
            </div>
            <span className="font-bold">+{Math.ceil(session.character_level / 4) + 1}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CharacterSheet;