"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type React from "react"; // Added import for React

export default function LoadingTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
      >
        <motion.div
          className="loader w-16 h-16 border-4 border-t-4 border-t-transparent rounded-full animate-spin"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    );
  }

  return <>{children}</>;
}
