import React from "react";

export default function SectionTitle({
  label,
  title,
  description,
  center = true,
}) {
  return (
    <div
      className={`max-w-4xl ${
        center ? "mx-auto text-center" : ""
      } mb-16`}
    >
      {label && (
        <p className="text-dbsOrange font-semibold uppercase tracking-wide">
          {label}
        </p>
      )}

      <h2 className="mt-4 text-3xl md:text-5xl font-heading font-bold">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}