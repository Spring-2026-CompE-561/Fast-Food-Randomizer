// frontend/src/components/CategoryPill.tsx
interface CategoryPillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CategoryPill({ label, isActive, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-lg border text-sm font-medium transition-all
        ${isActive 
          ? "bg-orange-600 border-orange-600 text-white shadow-md" 
          : "bg-white border-slate-200 text-slate-600 hover:border-orange-400 hover:text-orange-600"
        }`}
    >
      {label}
    </button>
  );
}