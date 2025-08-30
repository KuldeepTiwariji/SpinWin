import { type Category } from "@shared/schema";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <Card 
      className={`bg-gradient-to-br ${category.color} hover:border-opacity-50 transition-all cursor-pointer group p-6 rounded-xl`}
      onClick={onClick}
      data-testid={`card-category-${category.name.toLowerCase()}`}
    >
      <div className="text-center">
        <i className={`${category.icon} text-3xl mb-3 group-hover:scale-110 transition-transform text-white`}></i>
        <h3 className="font-semibold text-white" data-testid={`text-category-name-${category.id}`}>
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1" data-testid={`text-category-count-${category.id}`}>
          {category.gameCount} games
        </p>
      </div>
    </Card>
  );
}
