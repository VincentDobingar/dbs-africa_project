import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function TestimonialCard({
  name,
  role,
  text,
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all p-8 dark:border-gray-800 dark:bg-gray-950"
    >
      <Quote className="mb-4 text-dbsOrange/60" size={32} fill="currentColor" strokeWidth={0} />

      <div className="flex gap-1 text-dbsOrange mb-5">
        ★★★★★
      </div>

      <p className="text-gray-600 leading-relaxed dark:text-gray-300">
        “{text}”
      </p>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-lg dark:text-white">
          {name}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {role}
        </p>
      </div>
    </motion.div>
  );
}
