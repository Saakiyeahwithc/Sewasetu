import { createContext, useEffect, useRef, useState } from "react";

// Create the Toast Context
const ToastContext = createContext();

// Global function you can use anywhere
let triggerToast = () => console.warn("ToastProvider not mounted.");

// Exportable function to trigger toasts
export function showToast({ message, type = "info", duration = 3000 }) {
  triggerToast({ message, type, duration });
}

// ToastProvider component
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const addToast = ({ message, type, duration }) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration || 3000);
  };

  // Register the global trigger function
  useEffect(() => {
    triggerToast = addToast;
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}

      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded shadow text-white animate-fade-in-up ${
              {
                success: "bg-emerald-600",
                error: "bg-rose-600",
                info: "bg-sky-600",
              }[toast.type] || "bg-gray-800"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
