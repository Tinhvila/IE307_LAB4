import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from './Toast';

interface ToastContextProps {
  showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    message: string;
    duration: number;
    isVisible: boolean;
  }>({
    message: '',
    duration: 3000,
    isVisible: false,
  });

  const showToast = (message: string, duration: number = 3000) => {
    setToast({ message, duration, isVisible: true });

    // Auto-hide toast after `duration`
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        duration={toast.duration}
        isVisible={toast.isVisible}
        onDismiss={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
