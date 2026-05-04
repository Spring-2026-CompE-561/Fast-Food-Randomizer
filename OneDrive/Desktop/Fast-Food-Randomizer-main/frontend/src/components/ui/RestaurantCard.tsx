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
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="text-5xl">{emoji}</div>
      
      <div>
        <h3 className="text-2xl font-black tracking-tight text-slate-900">{name}</h3>
        
        <div className="flex items-center gap-1 mt-1">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-slate-700">{rating}</span>
          <span className="text-slate-400 text-sm">({reviews})</span>
        </div>
      </div>

      <div className="text-slate-500 font-medium">
        <span>{price}</span>
        <span className="mx-2">•</span>
        <span>{category}</span>
      </div>

      {onCampus && (
        <div className="text-slate-400 text-sm font-bold uppercase tracking-wider">
          On Campus
        </div>
      )}
    </div>
  );
}