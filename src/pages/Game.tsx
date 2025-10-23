import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const Game = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-sidebar-background border-b-2 border-sidebar-border p-3 flex justify-between items-center">
        <h1 className="text-xl font-serif text-sidebar-foreground tracking-wider">Dungeons & Dragons</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          ✕
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Image & Act Info */}
        <aside className="w-80 bg-card border-r-4 border-sidebar-background flex flex-col">
          <div className="h-74 bg-muted m-4 border-4 border-sidebar-background flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-6xl font-serif mb-4">✕</div>
              <p className="text-xs text-muted-foreground">Generated image for current act maybe</p>
            </div>
          </div>
          <div className="p-6 bg-sidebar-background text-sidebar-foreground">
            <h2 className="text-3xl font-serif mb-1">Act X</h2>
            <p className="text-sm opacity-70">description</p>
          </div>
        </aside>

        {/* Center & Right Panel */}
        <div className="flex-1 flex flex-col">
          {/* Top Section - AI Prompt Display */}
          <div className="flex-1 bg-sidebar-background p-6">
            <div className="h-full bg-card rounded border-4 border-primary/30 p-6">
              <h3 className="text-lg font-semibold mb-4">AI Dungeon master text prompt</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-xs">•</span>
                  <p className="text-sm"></p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs">•</span>
                  <p className="text-sm"></p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs">•</span>
                  <p className="text-sm"></p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs">•</span>
                  <p className="text-sm"></p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - User Input & Menu */}
          <div className="bg-sidebar-background p-6 pt-0 flex gap-4">
            {/* User Text Box */}
            <div className="flex-1 bg-card rounded border-4 border-primary/30 p-4">
              <p className="text-sm text-muted-foreground">User text box</p>
            </div>

            {/* Right Menu */}
            <div className="w-48 bg-accent rounded border-4 border-primary/30 p-4 flex flex-col justify-between relative">
              <Button variant="ghost" size="sm" className="absolute top-2 right-2 text-foreground">
                ✕
              </Button>
              <div className="space-y-2 mt-8 text-right">
                <p className="text-sm font-semibold">Main Menu</p>
                <p className="text-sm font-semibold">Character Stats</p>
                <p className="text-sm font-semibold">Restart</p>
                <p className="text-sm font-semibold">Exit</p>
              </div>
              <div className="flex justify-end">
                <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                  <div className="space-y-1">
                    <div className="w-4 h-0.5 bg-foreground"></div>
                    <div className="w-4 h-0.5 bg-foreground"></div>
                    <div className="w-4 h-0.5 bg-foreground"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Left - Dice Icons */}
          <div className="bg-sidebar-background px-6 pb-4 flex gap-2">
            <div className="w-12 h-12 bg-card rounded border-2 border-sidebar-border flex items-center justify-center">
              <span className="text-xl font-serif">✕</span>
            </div>
            <div className="w-12 h-12 bg-card rounded border-2 border-sidebar-border flex items-center justify-center">
              <span className="text-xl font-serif">✕</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
