import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="card w-full max-w-md text-center space-y-6 p-8">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-primary">Algo salió mal</h2>
          <p className="text-primary/60 text-sm">
            Ha ocurrido un error inesperado en la aplicación.
          </p>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 p-4 rounded-lg text-left overflow-auto max-h-40">
            <p className="text-xs font-mono text-red-700 whitespace-pre-wrap">
              {error.message}
            </p>
          </div>
        )}

        <button
          onClick={resetErrorBoundary}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <RefreshCcw size={18} />
          Recargar Aplicación
        </button>
      </div>
    </div>
  );
}

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ReactErrorBoundary>
  );
}
