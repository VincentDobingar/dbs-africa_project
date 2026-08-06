import React from "react";

export default function SectorCard({
  sector,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-dbsLight p-6 text-center font-semibold hover:border-dbsOrange hover:text-dbsOrange transition dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
      {sector}
    </div>
  );
}
