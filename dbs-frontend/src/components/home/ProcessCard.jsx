import React from "react";

export default function ProcessCard({
  number,
  title,
  description,
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-dbsOrange/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-orange-500/10">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-dbsOrange/30 bg-dbsOrange/10 text-lg font-bold text-dbsOrange transition-colors duration-300 group-hover:bg-dbsOrange group-hover:text-white">
        {number}
      </div>

      <h3 className="text-xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-300">
        {description}
      </p>
    </div>
  );
}
