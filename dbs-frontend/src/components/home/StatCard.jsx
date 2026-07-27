import { useEffect, useState } from "react";
import { BadgeCheck, Briefcase, Layers, Handshake } from "lucide-react";

const icons = {
  badge: BadgeCheck,
  briefcase: Briefcase,
  layers: Layers,
  handshake: Handshake,
};

export default function StatCard({ value, label, sub, icon }) {
  const [count, setCount] = useState(0);
  const finalValue = Number(value);
  const Icon = icons[icon] || BadgeCheck;

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = 30;
    const increment = finalValue / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;

      if (start >= finalValue) {
        setCount(finalValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [finalValue]);

  return (
    <div className="rounded-2xl border border-white/20 bg-black/30 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-black/40 hover:shadow-xl hover:shadow-orange-500/20">
      <div className="flex items-center gap-6">
        <div className="text-dbsOrange">
          <Icon size={46} strokeWidth={2.2} />
        </div>

        <div>
          <h3 className="text-4xl font-bold text-white">{count}+</h3>
          <p className="mt-1 text-lg font-medium text-white">{label}</p>
          <p className="mt-1 text-sm text-gray-200">{sub}</p>
        </div>
      </div>
    </div>
  );
}