import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Menu } from "lucide-react";

const Game = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
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
        <h1 className="text-xl font-serif text-sidebar-foreground tracking-wider">
          Dungeons & Dragons
        </h1>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-sidebar-foreground hover:bg-sidebar-accent">
          ✕
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Image & Act Info */}
        <aside className="w-80 bg-card border-r-4 border-sidebar-background flex flex-col">
          <div className="h-64 bg-muted m-4 border-4 border-sidebar-background flex items-center justify-center">
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

          {/* Bottom Section - User Input */}
          <div className="bg-sidebar-background p-6 pt-0">
            {/* User Text Box */}
            <div className="bg-card rounded border-4 border-primary/30 p-4">
              <p className="text-sm text-muted-foreground">User text box</p>
            </div>
          </div>

          {/* Bottom - Dice Icons & Menu */}
          <div className="bg-sidebar-background px-6 pb-4 flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-card rounded border-2 border-sidebar-border flex items-center justify-center">
                <span className="text-xl font-serif">✕</span>
              </div>
              <div className="w-12 h-12 bg-card rounded border-2 border-sidebar-border flex items-center justify-center">
                <span className="text-xl font-serif">✕</span>
              </div>
            </div>

            {/* Burger Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="border-4 border-primary/30">
                  <Menu className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48" align="end">
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">Main Menu</Button>
                  <Button variant="ghost" className="w-full justify-start">Character Stats</Button>
                  <Button variant="ghost" className="w-full justify-start">Restart</Button>
                  <Button variant="ghost" className="w-full justify-start">Exit</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;