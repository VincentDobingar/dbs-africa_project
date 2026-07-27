import React from "react";

export default function ProcessCard({
  number,
  title,
  description,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
      <div className="text-4xl font-bold text-dbsOrange mb-5">
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