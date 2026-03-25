import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Trash2, Check, PenTool } from 'lucide-react';

interface SignaturePadProps {
  onSave: (signature: string) => void;
  onClear: () => void;
}

export default function SignaturePad({ onSave, onClear }: SignaturePadProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 200 });

  // Handle responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setCanvasSize({
          width: containerRef.current.offsetWidth,
          height: 200
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const clear = () => {
    sigCanvas.current?.clear();
    setIsEmpty(true);
    onClear();
  };

  const handleEnd = () => {
    if (sigCanvas.current) {
      const empty = sigCanvas.current.isEmpty();
      setIsEmpty(empty);
      
      if (!empty) {
        const data = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        if (data) {
          onSave(data);
        }
      } else {
        onClear();
      }
    }
  };

  return (
    <div className="space-y-3">
      <div 
        ref={containerRef}
        className="border-2 border-dashed border-primary/20 rounded-2xl bg-gray-50 overflow-hidden relative group"
      >
        {isEmpty && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/20 pointer-events-none">
            <PenTool size={48} className="mb-2" />
            <p className="text-sm font-bold uppercase tracking-widest">Firme aquí</p>
          </div>
        )}
        <SignatureCanvas
          ref={sigCanvas}
          penColor="#0B2545"
          canvasProps={{
            width: canvasSize.width,
            height: canvasSize.height,
            className: "cursor-crosshair",
          }}
          onBegin={() => setIsEmpty(false)}
          onEnd={handleEnd}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={clear}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <Trash2 size={18} />
          Limpiar Firma
        </button>
        
        <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
          {!isEmpty && (
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full animate-in zoom-in duration-300">
              <Check size={18} />
              <span>Firma capturada</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
