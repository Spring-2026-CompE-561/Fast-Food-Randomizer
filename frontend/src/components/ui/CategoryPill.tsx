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
          ? "bg-primary border-primary text-primary-foreground shadow-md" 
          : "bg-card border-border text-muted-foreground hover:border-primary/70 hover:text-primary"
        }`}
    >
      {label}
    </button>
  );
}