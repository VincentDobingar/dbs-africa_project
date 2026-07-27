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
      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all p-6 text-center dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="h-24 flex items-center justify-center mb-5 rounded-xl dark:bg-white/90 dark:p-3">
        <img
          src={logo}
          alt={name}
          className="max-h-20 object-contain"
        />
      </div>

      <h3 className="font-bold text-lg dark:text-white">
        {name}
      </h3>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </motion.div>
  );
}