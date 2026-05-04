// src/components/ui/ModeToggle.tsx
interface ModeToggleProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ModeToggle = ({ activeTab, setActiveTab }: ModeToggleProps) => {
  const tabs = [
    { id: "button", label: "Button", icon: "🎲" },
    { id: "wheel", label: "Spin the Wheel", icon: "🎡" },
    { id: "slot", label: "Slot Machine", icon: "🎰" }
  ];

  return (
    <div className="bg-[#FDE68A] p-1.5 rounded-full flex items-center shadow-inner">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-8 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === tab.id 
              ? "bg-[#FFFDF0] text-[#111827] shadow-sm" 
              : "text-[#856404] hover:text-[#111827]"
          }`}
        >
          <span>{tab.icon}</span> {tab.label}
        </button>
      ))}
    </div>
  );
};