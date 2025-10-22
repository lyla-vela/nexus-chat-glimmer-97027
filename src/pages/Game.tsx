import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CharacterSheet from "@/components/CharacterSheet";
import ChatInterface from "@/components/ChatInterface";
import DiceRoller from "@/components/DiceRoller";
import CharacterCreation from "@/components/CharacterCreation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Game = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    loadSession();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/");
    }
  };

  const loadSession = async () => {
    try {
      const { data: sessions, error } = await supabase
        .from("game_sessions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;
      if (sessions && sessions.length > 0) {
        setSession(sessions[0]);
      }
    } catch (error: any) {
      toast({
        title: "Error loading session",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleCharacterCreated = (newSession: any) => {
    setSession(newSession);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading your adventure...</p>
      </div>
    );
  }

  if (!session) {
    return <CharacterCreation onCharacterCreated={handleCharacterCreated} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            D&D AI Dungeon Master
          </h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-4 h-[calc(100vh-73px)] flex gap-4">
        {/* Left sidebar - Character Sheet */}
        <aside className="w-80 flex-shrink-0">
          <CharacterSheet session={session} onUpdate={setSession} />
        </aside>

        {/* Center - Chat Interface */}
        <main className="flex-1 flex flex-col min-w-0">
          <ChatInterface session={session} />
        </main>

        {/* Right sidebar - Dice Roller */}
        <aside className="w-64 flex-shrink-0">
          <DiceRoller sessionId={session.id} />
        </aside>
      </div>
    </div>
  );
};

export default Game;