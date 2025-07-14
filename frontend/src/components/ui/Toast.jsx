import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ToastContext = createContext(null);

let toastRef = null;

// Exported helper function (can be used globally)
export function showToast({
  title,
  description,
  variant = "info",
  duration = 4000,
}) {
  if (toastRef) {
    toastRef({ title, description, variant, duration });
  } else {
    console.warn("ToastManager not mounted.");
  }
}

export function Toast({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (toast) => {
      const id = Math.random().toString(36).substr(2, 9); // unique ID
      const toastWithId = { id, ...toast };
      setToasts((prev) => [...prev, toastWithId]);

      const ttl = toast.duration || 4000;
      setTimeout(() => remove(id), ttl);
    },
    [remove]
  );

  export function ToastProvider({ children }) {
  const idRef = useRef(0);

  const addToast = (toast) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, ...toast }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 4000);
  };

  useEffect(() => {
    // Assign global function
    setShowToast = addToast;
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      <div className="fixed inset-x-0 top-4 z-[1000] flex flex-col items-center gap-2 pointer-events-none">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={() => remove(toast.id)}
              className={`pointer-events-auto w-[90%] max-w-sm rounded-lg shadow-lg px-4 py-3 ring-1 ring-black/5 cursor-pointer
                ${
                  {
                    success: "bg-emerald-50 text-emerald-900",
                    error: "bg-rose-50 text-rose-900",
                    info: "bg-sky-50 text-sky-900",
                  }[toast.variant || "info"]
                }`}
              role="alert"
            >
              <p className="font-semibold">{toast.title}</p>
              {toast.description && (
                <p className="text-sm opacity-80">{toast.description}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx.show;
};

export default Toast;
