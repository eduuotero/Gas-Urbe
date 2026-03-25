export type UserRole = 'tecnico' | 'coordinador' | 'administrador';

export interface User {
  id: string;
  nombre: string;
  email: string;
  role: UserRole;
  telefono?: string;
  zona_asignada?: string;
  activo: boolean;
  ubicacion_actual?: {
    lat: number;
    lng: number;
  };
  ultimo_ping?: Date;
}

export interface Cliente {
  id: string;
  nombre: string;
  direccion: string;
  colonia: string;
  zona: string;
  telefono: string;
  id_contrato_salesforce: string;
}

export type ServiceStatus = 'pendiente' | 'en_transito' | 'en_servicio' | 'completado' | 'cancelado';

export interface Servicio {
  id: string;
  id_cliente: string;
  id_tecnico: string;
  fecha: string;
  hora_inicio?: string;
  hora_fin?: string;
  tipo_servicio: string;
  materiales_usados: {
    nombre: string;
    cantidad: number;
    serie?: string;
  }[];
  estado_instalacion: string;
  observaciones?: string;
  fotos_antes: string[];
  fotos_despues: string[];
  firma_cliente?: string;
  tiempo_cierre_reporte?: number;
  sincronizado_salesforce: boolean;
  id_expediente_salesforce?: string;
  estatus: ServiceStatus;
  ubicacion_cierre?: {
    lat: number;
    lng: number;
  };
}

export interface Material {
  id: string;
  nombre: string;
  unidad: string;
  precio_unitario?: number;
  activo: boolean;
}

export interface Zona {
  id: string;
  nombre: string;
  poligono_geografico?: any;
  tecnico_asignado_default?: string;
}
