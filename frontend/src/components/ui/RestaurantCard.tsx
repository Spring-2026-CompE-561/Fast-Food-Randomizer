// frontend/src/components/RestaurantCard.tsx
import { Star } from "lucide-react";

interface RestaurantCardProps {
  name: string;
  emoji: string;
  rating: number;
  reviews: number;
  price: string;
  category: string;
  onCampus: boolean;
}

export default function RestaurantCard({
  name, emoji, rating, reviews, price, category, onCampus 
}: RestaurantCardProps) {
  return (
    <div className="bg-card rounded-[32px] p-8 shadow-sm border border-border flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="text-5xl">{emoji}</div>
      
      <div>
        <h3 className="text-2xl font-black tracking-tight text-card-foreground">{name}</h3>
        
        <div className="flex items-center gap-1 mt-1">
          <Star size={16} className="fill-primary text-primary" />
          <span className="font-bold text-foreground">{rating}</span>
          <span className="text-muted-foreground text-sm">({reviews})</span>
        </div>
      </div>

      <div className="text-muted-foreground font-medium">
        <span>{price}</span>
        <span className="mx-2">•</span>
        <span>{category}</span>
      </div>

      {onCampus && (
        <div className="text-muted-foreground text-sm font-bold uppercase tracking-wider">
          On Campus
        </div>
      )}
    </div>
  );
}