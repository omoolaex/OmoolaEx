"use client";

import { useState, useCallback } from "react";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description }) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, title, description }]);
    // auto-remove after 5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return { toast, toasts, setToasts };
}
