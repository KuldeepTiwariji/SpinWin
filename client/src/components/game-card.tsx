import { Star } from "lucide-react";
import { type Game } from "@shared/schema";
import { Card } from "@/components/ui/card";

interface GameCardProps {
  game: Game;
  size?: "small" | "large";
  onClick?: () => void;
}

export function GameCard({ game, size = "large", onClick }: GameCardProps) {
  const isSmall = size === "small";
  
  return (
    <Card 
      className={`game-card bg-card rounded-xl overflow-hidden border border-border cursor-pointer relative ${
        isSmall ? "" : ""
      }`}
      onClick={onClick}
      data-testid={`card-game-${game.id}`}
    >
      {game.isNew === 1 && (
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full z-10">
          NEW
        </div>
      )}
      
      <img 
        src={game.imageUrl} 
        alt={game.title}
        className={`w-full object-cover ${isSmall ? "h-32" : "h-48"}`}
        data-testid={`img-game-${game.id}`}
      />
      
      <div className={`p-${isSmall ? "3" : "4"}`}>
        <h3 className={`font-semibold mb-2 ${isSmall ? "text-sm truncate" : ""}`} data-testid={`text-title-${game.id}`}>
          {game.title}
        </h3>
        
        {!isSmall && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span data-testid={`text-category-${game.id}`}>{game.category}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span data-testid={`text-rating-${game.id}`}>{(game.rating / 10).toFixed(1)}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
