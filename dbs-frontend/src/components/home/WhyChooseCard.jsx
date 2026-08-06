import React from "react";

export default function WhyChooseCard({
  icon,
  title,
  text,
}) {
  const Icon = icon;

  return (
    <div className="rounded-3xl bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition dark:border-gray-800 dark:bg-gray-900">
      <div className="w-14 h-14 rounded-2xl bg-orange-100 text-dbsOrange flex items-center justify-center mb-5 dark:bg-orange-500/15">
        <Icon size={30} />
      </div>

      <h3 className="text-xl font-bold mb-3 dark:text-white">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed dark:text-gray-300">
        {text}
      </p>
    </div>
  );
}
