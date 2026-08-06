import React from "react";
import { motion } from "framer-motion";

export default function PartnerCard({
  logo,
  name,
  description,
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-dbsOrange/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-orange-500/10"
    >
      <div className="h-24 flex items-center justify-center mb-5 rounded-xl bg-white/90 p-3">
        <img
          src={logo}
          alt={name}
          className="max-h-20 object-contain"
        />
      </div>

      <h3 className="font-bold text-lg text-white">
        {name}
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        {description}
      </p>
    </motion.div>
  );
}
