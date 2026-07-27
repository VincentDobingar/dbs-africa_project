import React from "react";
import { Link } from "react-router-dom";

export default function CTAButton({
  to,
  label,
  primary = true,
}) {
  return (
    <Link
      to={to}
      className={
        primary
          ? "rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white hover:bg-orange-600 transition"
          : "rounded-full border border-white/40 px-8 py-4 font-semibold hover:bg-white hover:text-dbsDark transition"
      }
    >
      {label}
    </Link>
  );
}