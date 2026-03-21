import { createContext, useContext, useState } from "react";

interface Toast {
  id: number;
  message: string;
}

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: any) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast UI */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-[#5E2A14] text-white px-6 py-3 text-sm shadow-lg"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext)!;