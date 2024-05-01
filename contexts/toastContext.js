import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastNotification from '../components/notifications/ToastNotification';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000); // Auto-dismiss after 3 seconds
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.message && <ToastNotification message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
};
