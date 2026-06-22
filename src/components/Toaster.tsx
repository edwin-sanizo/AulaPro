import React from 'react';
import { Toaster as SonnerToaster } from 'sonner';

export default function Toaster() {
  return (
    <SonnerToaster 
      position="top-center"
      richColors
      expand
      closeButton
      toastOptions={{
        duration: 4000,
        style: {
          background: 'white',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          padding: '16px',
        },
      }}
    />
  );
}