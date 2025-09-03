import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  onPlay: () => void;
}

export default function GameCard({ title, description, image, onPlay }: GameCardProps) {
  return (
    <motion.div
      className="game-card rounded-2xl p-6 text-center cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      data-testid={`game-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="mb-6 h-32 flex items-center justify-center overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={`${title} game`} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-2xl font-serif font-bold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button 
        onClick={onPlay}
        className="w-full bg-primary text-primary-foreground hover:bg-accent transition-colors duration-200"
        data-testid={`button-play-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        Play Now
      </Button>
    </motion.div>
  );
}
