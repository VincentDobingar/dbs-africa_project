import { useTranslation } from "react-i18next";
import { stats } from "../../data/homeData.jsx";
import StatCard from "./StatCard";

export default function StatsSection() {
  const { t } = useTranslation();

  return (
    <div className="relative z-20 mx-auto mt-10 max-w-7xl px-4 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            value={stat.value}
            label={t(stat.labelKey)}
            sub={t(stat.subKey)}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}