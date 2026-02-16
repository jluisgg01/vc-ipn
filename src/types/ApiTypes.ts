// src/types/ApiTypes.ts

// API 1: Ranking Genérico
export interface ApiRankingItem {
  cecos: string;       // Nombre de la región o sucursal
  calif: number;       // Score IPN
  detractores: number; // Porcentaje o conteo
  pasivos: number;     // Porcentaje o conteo
  promotores: number;  // Porcentaje o conteo
  totalclientes: number; // Confirmado que se enviará
}

// API 2: Detalle Negocio
export interface ApiNegocioItem {
  id: number;
  desc: string; // Nombre del negocio (Ej: Afore, Seguros)
  calif: number;
}

// API 3: Verbalizaciones
export interface ApiVerbalizacion {
  dato: string;      // El comentario
  cecodesc: string;  // "Esmeralda 123" o "5010"
}

// API 4: Tacómetro y Resumen NPS
export interface ApiTacometroResponse {
  nivel: string;        // "PDV", "Region", etc.
  tendencia: number;    // 0.2, -0.5, etc.
  califTaco: number;    // 55 (Porcentaje principal)
  promotores: number;   // 87.50
  detractores: number;  // 0
  pasivos: number;      // 12.5
  totalclientes: number;// 300
}
