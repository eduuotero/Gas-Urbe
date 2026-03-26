import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { Camera, Plus, Trash2, CheckCircle2, ChevronLeft, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceFormData {
  tipo_servicio: string;
  materiales: { nombre: string; cantidad: number; serie?: string }[];
  estado_instalacion: string;
  observaciones: string;
  fotos_antes: string[];
  fotos_despues: string[];
}

const TIPO_SERVICIOS = [
  'Revisión general de instalación',
  'Cambio de medidor',
  'Cambio de válvula',
  'Reparación de fuga',
  'Cambio de manguera',
  'Instalación nueva',
  'Mantenimiento preventivo',
  'Otro'
];

const MATERIALES = [
  'Medidor',
  'Válvula de paso',
  'Manguera flexible',
  'Codo de cobre',
  'Teflón',
  'Sellador'
];

const ESTADOS = [
  { label: 'Óptimo – sin observaciones', value: 'optimo', color: 'bg-green-500' },
  { label: 'Requiere seguimiento (< 30 días)', value: 'seguimiento', color: 'bg-yellow-500' },
  { label: 'Requiere revisión urgente', value: 'urgente', color: 'bg-orange-500' },
  { label: 'Se detectó irregularidad', value: 'irregularidad', color: 'bg-red-500' }
];

export default function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, control, watch, setValue } = useForm<ServiceFormData>({
    defaultValues: {
      materiales: [],
      fotos_antes: [],
      fotos_despues: [],
      tipo_servicio: '',
      estado_instalacion: '',
      observaciones: ''
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materiales"
  });

  const watchFotosAntes = watch('fotos_antes');
  const watchFotosDespues = watch('fotos_despues');

  const handlePhotoUpload = (type: 'antes' | 'despues') => {
    const mockUrl = `https://picsum.photos/seed/${Math.random()}/400/300`;
    const current = watch(type === 'antes' ? 'fotos_antes' : 'fotos_despues');
    if (current.length < 5) {
      setValue(type === 'antes' ? 'fotos_antes' : 'fotos_despues', [...current, mockUrl]);
    }
  };

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    
    // Mock save delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Demo: Form data saved locally", data);
    setIsSuccess(true);
    
    setTimeout(() => {
      navigate('/agenda');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-green-500 flex flex-col items-center justify-center text-white p-6 z-[100] animate-in fade-in duration-500">
        <CheckCircle2 size={120} className="mb-6 animate-bounce" />
        <h2 className="text-4xl font-bold mb-2">¡Reporte Enviado!</h2>
        <p className="text-xl opacity-90 text-center">La información ha sido guardada en el sistema.</p>
        <div className="mt-12 flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-sm font-medium">Volviendo a la agenda...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/agenda')} className="p-2 hover:bg-primary/5 rounded-lg">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-primary">Registro de Servicio</h2>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-1 mb-8">
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-300",
              step >= s ? "bg-accent" : "bg-primary/10"
            )} 
          />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 1: Tipo de Servicio */}
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-bold text-primary">¿Qué servicio realizaste?</h3>
            <div className="grid grid-cols-1 gap-3">
              {TIPO_SERVICIOS.map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => {
                    setValue('tipo_servicio', tipo);
                    setStep(2);
                  }}
                  className={cn(
                    "p-4 text-left rounded-xl border-2 transition-all font-bold text-lg",
                    watch('tipo_servicio') === tipo 
                      ? "border-accent bg-accent/5 text-accent" 
                      : "border-gray-100 hover:border-accent/30 text-primary"
                  )}
                >
                  {tipo}
                </button>
              ))}
            </div>
            <div className="pt-4">
              <button type="button" onClick={() => setStep(2)} className="w-full p-4 rounded-xl border-2 border-primary/10 font-bold text-primary/60">Saltar este paso</button>
            </div>
          </div>
        )}

        {/* Step 2: Materiales y Fotos Antes */}
        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Evidencia: Antes del servicio</h3>
              <div className="grid grid-cols-3 gap-2">
                {watchFotosAntes.map((url, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden relative border border-gray-100">
                    <img src={url} alt="Antes" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setValue('fotos_antes', watchFotosAntes.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                {watchFotosAntes.length < 5 && (
                  <button
                    type="button"
                    onClick={() => handlePhotoUpload('antes')}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-primary/40 hover:border-accent hover:text-accent transition-colors"
                  >
                    <Camera size={32} />
                    <span className="text-[10px] font-bold uppercase mt-1">Foto Antes</span>
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Materiales Utilizados</h3>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="card flex items-center gap-3 p-3">
                    <div className="flex-1">
                      <p className="font-bold text-primary">{field.nombre}</p>
                      <div className="flex gap-2 mt-2">
                        <input
                          type="number"
                          placeholder="Cant."
                          {...register(`materiales.${index}.cantidad` as const)}
                          className="w-20 p-2 rounded-lg border border-gray-200 text-sm"
                        />
                        {field.nombre === 'Medidor' && (
                          <input
                            type="text"
                            placeholder="N/S Medidor"
                            {...register(`materiales.${index}.serie` as const)}
                            className="flex-1 p-2 rounded-lg border border-gray-200 text-sm font-mono"
                          />
                        )}
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => remove(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                
                <div className="grid grid-cols-2 gap-2">
                  {MATERIALES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => append({ nombre: m, cantidad: 1 })}
                      className="p-3 text-sm font-bold text-primary/70 border border-gray-100 rounded-lg hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
                    >
                      <Plus size={16} />
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 p-4 rounded-xl border-2 border-primary/10 font-bold text-primary">Atrás</button>
              <button type="button" onClick={() => setStep(3)} className="flex-1 p-4 rounded-xl bg-accent text-white font-bold">Siguiente</button>
            </div>
          </div>
        )}

        {/* Step 3: Fotos Después y Estado */}
        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Evidencia: Después del servicio</h3>
              <div className="grid grid-cols-3 gap-2">
                {watchFotosDespues.map((url, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden relative border border-gray-100">
                    <img src={url} alt="Después" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setValue('fotos_despues', watchFotosDespues.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                {watchFotosDespues.length < 5 && (
                  <button
                    type="button"
                    onClick={() => handlePhotoUpload('despues')}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-primary/40 hover:border-accent hover:text-accent transition-colors"
                  >
                    <Camera size={32} />
                    <span className="text-[10px] font-bold uppercase mt-1">Foto Después</span>
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Estado de la Instalación</h3>
              <div className="grid grid-cols-1 gap-3">
                {ESTADOS.map((estado) => (
                  <button
                    key={estado.value}
                    type="button"
                    onClick={() => setValue('estado_instalacion', estado.value)}
                    className={cn(
                      "p-4 text-left rounded-xl border-2 transition-all flex items-center gap-4",
                      watch('estado_instalacion') === estado.value 
                        ? "border-accent bg-accent/5" 
                        : "border-gray-100"
                    )}
                  >
                    <div className={cn("w-4 h-4 rounded-full", estado.color)} />
                    <span className={cn("font-bold", watch('estado_instalacion') === estado.value ? "text-accent" : "text-primary")}>
                      {estado.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Observaciones (Opcional)</h3>
              <textarea
                {...register('observaciones')}
                className="w-full p-4 rounded-xl border border-gray-200 min-h-[100px] text-primary"
                placeholder="Escribe aquí cualquier detalle adicional..."
              />
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 p-4 rounded-xl border-2 border-primary/10 font-bold text-primary">Atrás</button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 p-4 rounded-xl bg-green-600 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={20} />
                    Finalizar Reporte
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
