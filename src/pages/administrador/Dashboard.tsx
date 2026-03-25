import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { 
  TrendingUp, Users, CheckCircle2, Clock, Map as MapIcon, 
  Download, Filter, ChevronRight, FileText, FileSpreadsheet
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_DATA = [
  { name: 'Revisión', value: 400 },
  { name: 'Medidor', value: 300 },
  { name: 'Válvula', value: 200 },
  { name: 'Fuga', value: 150 },
  { name: 'Instalación', value: 100 },
];

const MOCK_TREND = [
  { name: 'Lun', servicios: 45 },
  { name: 'Mar', servicios: 52 },
  { name: 'Mie', servicios: 48 },
  { name: 'Jue', servicios: 61 },
  { name: 'Vie', servicios: 55 },
  { name: 'Sab', servicios: 30 },
  { name: 'Dom', servicios: 15 },
];

const COLORS = ['#0B2545', '#E85D26', '#1E4D8C', '#F28F6B', '#3B6FB6'];

const KPIS = [
  { label: 'Total Servicios', value: '1,245', trend: '+12%', icon: FileText, color: 'text-primary' },
  { label: 'Registro Digital', value: '98.5%', trend: '+2%', icon: CheckCircle2, color: 'text-green-600' },
  { label: 'Evidencia Salesforce', value: '82%', trend: '+5%', icon: TrendingUp, color: 'text-accent' },
  { label: 'Tiempo Cierre', value: '1.4h', trend: '-15%', icon: Clock, color: 'text-orange-500' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Dashboard Administrativo</h2>
          <p className="text-primary/60 text-sm">Resumen de operaciones y KPIs de mantenimiento</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-primary hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
            <Download size={18} />
            Exportar
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="card flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className={cn("p-2 rounded-lg bg-primary/5", kpi.color)}>
                <kpi.icon size={24} />
              </div>
              <span className={cn(
                "text-xs font-bold px-2 py-1 rounded-full",
                kpi.trend.startsWith('+') ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              )}>
                {kpi.trend}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">{kpi.label}</p>
              <p className="text-3xl font-black text-primary">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card space-y-6">
          <h3 className="font-bold text-lg text-primary">Servicios por Tipo</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MOCK_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card space-y-6">
          <h3 className="font-bold text-lg text-primary">Tendencia Semanal</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#0B2545', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#0B2545', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="servicios" 
                  stroke="#E85D26" 
                  strokeWidth={4} 
                  dot={{r: 6, fill: '#E85D26', strokeWidth: 2, stroke: '#fff'}}
                  activeDot={{r: 8}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Services Table */}
      <div className="card overflow-hidden p-0">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-lg text-primary">Últimos Servicios Registrados</h3>
          <button className="text-sm font-bold text-accent flex items-center gap-1 hover:underline">
            Ver todos <ChevronRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary/5 text-[10px] font-bold uppercase tracking-widest text-primary/40">
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Técnico</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Estatus</th>
                <th className="px-6 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-primary">25/03/2026</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-primary">Cliente Ejemplo {i}</p>
                    <p className="text-xs text-primary/60">Contrato: #88231{i}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-primary/70">Juan Pérez</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-accent px-2 py-1 bg-accent/10 rounded-full">Revisión</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs font-bold text-primary/70">Sincronizado</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-primary/10 rounded-lg text-primary/40">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
