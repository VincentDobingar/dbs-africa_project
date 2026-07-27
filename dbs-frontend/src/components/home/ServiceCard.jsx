import React from "react";

export default function ServiceCard({
  icon,
  title,
  text,
}) {
  const Icon = icon;

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm hover:-translate-y-1 hover:shadow-xl transition dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
        <Icon size={30} />
      </div>

      <h3 className="text-xl font-bold dark:text-white">
        {title}
      </h3>

      <p className="mt-4 text-gray-600 leading-relaxed dark:text-gray-300">
        {text}
      </p>
    </div>
  );
}