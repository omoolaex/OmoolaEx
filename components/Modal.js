// File: components/Modal.js
'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ children, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
