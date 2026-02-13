<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  canalSeleccionado: { type: String, default: 'Formatos Propios' }
});

const segmentacionActiva = ref('Geografía');
const itemAbierto = ref(null);

// --- MÉTODOS ---
const toggleItemGeografia = (id) => {
  if (segmentacionActiva.value === 'Geografía') {
    itemAbierto.value = itemAbierto.value === id ? null : id;
  }
};

const handleNegocioToggle = (event, id) => {
  event.stopPropagation();

  // Si hacemos clic en el que ya está abierto, lo cerramos (vuelve a rojo)
  if (itemAbierto.value === id) {
    itemAbierto.value = null;
  } else {
    // Si hacemos clic en uno nuevo, el anterior se cierra automáticamente
    // y este nuevo se abre (se pone en verde y baja al final)
    itemAbierto.value = id;
  }
};

// --- DATA ---
const listaNegociosComun = [
  { nombre: 'Afore', valor: 81.78 }, { nombre: 'Cajas', valor: 70.44 },
  { nombre: 'Canales Terceros', valor: 73.69 }, { nombre: 'Captación', valor: 73.69 },
  { nombre: 'Crédito al consumo', valor: 73.69 }, { nombre: 'Divisas', valor: 73.69 },
  { nombre: 'Elektra', valor: 73.69 }, { nombre: 'Nómina Azteca', valor: 73.69 },
  { nombre: 'Presta Prenda', valor: 58.20 }, { nombre: 'Préstamos Personales', valor: 55.40 },
  { nombre: 'Remesas', valor: 50.15 }, { nombre: 'Seguros', valor: 45.00 }
];

const baseDeDatos = {
  'Formatos Propios': {
    Geografía: [
      { id: 1, nombre: 'Baja California Sur', score: '72.08', clientes: '300 clientes', detalle: { prom: '77.41%', pas: '11.63%', det: '10.40%' } },
      { id: 2, nombre: 'Norte', score: '68.54', clientes: '300 clientes', detalle: { prom: '65.10%', pas: '20.00%', det: '14.90%' } },
      { id: 3, nombre: 'Sur', score: '63.85', clientes: '300 clientes', detalle: { prom: '50.00%', pas: '30.00%', det: '20.00%' } }
    ],
    Negocio: [
      { id: 1, nombre: 'Norte', negocios: listaNegociosComun },
      { id: 2, nombre: 'Sur', negocios: listaNegociosComun },
      { id: 3, nombre: 'Centro', negocios: listaNegociosComun }
    ]
  },
  'Canales Terceros': {
    Geografía: [
      { id: 1, nombre: 'Division del Norte', score: '70.50', clientes: '250 clientes', detalle: { prom: '75.00%', pas: '15.00%', det: '10.00%' } },
      { id: 2, nombre: 'Occidente', score: '66.20', clientes: '200 clientes', detalle: { prom: '60.00%', pas: '25.00%', det: '15.00%' } },
      { id: 3, nombre: 'Oriente', score: '62.10', clientes: '180 clientes', detalle: { prom: '55.00%', pas: '25.00%', det: '20.00%' } }
    ],
    Negocio: [
      { id: 1, nombre: 'Division del Norte', negocios: listaNegociosComun },
      { id: 2, nombre: 'Occidente', negocios: listaNegociosComun },
      { id: 3, nombre: 'Oriente', negocios: listaNegociosComun }
    ]
  },
  'Presta Prenda': {
    Geografía: [
      { id: 1, nombre: 'Baja California Sur', score: '74.30', clientes: '320 clientes', detalle: { prom: '78.00%', pas: '12.00%', det: '10.00%' } },
      { id: 2, nombre: 'Centro', score: '69.10', clientes: '280 clientes', detalle: { prom: '66.00%', pas: '20.00%', det: '14.00%' } },
      { id: 3, nombre: 'Sureste', score: '64.50', clientes: '260 clientes', detalle: { prom: '52.00%', pas: '28.00%', det: '20.00%' } }
    ],
    Negocio: [
      { id: 1, nombre: 'Baja California Sur', negocios: listaNegociosComun },
      { id: 2, nombre: 'Centro', negocios: listaNegociosComun },
      { id: 3, nombre: 'Sureste', negocios: listaNegociosComun }
    ]
  }
};

// --- LÓGICA DE POSICIONAMIENTO ---
const rankingFinal = computed(() => {
  const lista = baseDeDatos[props.canalSeleccionado]?.[segmentacionActiva.value] || [];

  if (segmentacionActiva.value === 'Negocio') {
    return [...lista].sort((a, b) => {
      // El item abierto (itemAbierto) siempre va al final
      if (a.id === itemAbierto.value) return 1;
      if (b.id === itemAbierto.value) return -1;
      return a.id - b.id;
    }).map(item => ({
      ...item,
      negocios: [...item.negocios].sort((a, b) => b.valor - a.valor)
    }));
  }
  return lista;
});
</script>

<template>
  <div class="ranking-wrapper">
    <div class="main-card">
      <h3 class="card-title">Calificación IPN (Territorios)</h3>

      <div class="segment-pill-container">
        <button v-for="t in ['Geografía', 'Negocio']" :key="t"
                @click="segmentacionActiva = t; itemAbierto = null"
                :class="['segment-pill', { active: segmentacionActiva === t }]">
          {{ t }}
        </button>
      </div>

      <transition-group name="list-reorder" tag="div" class="list-container">
        <div v-for="item in rankingFinal" :key="item.id" class="ranking-group">

          <div :class="['ranking-item', { 'item-expanded': itemAbierto === item.id, 'no-cursor': segmentacionActiva === 'Negocio' }]"
               @click="toggleItemGeografia(item.id)">

            <div class="rank-badge"
                 :class="{
                'bg-green': segmentacionActiva === 'Geografía' || itemAbierto === item.id,
                'bg-gray': segmentacionActiva === 'Negocio' && itemAbierto !== item.id
              }">
              {{ item.id }}
            </div>

            <div class="name-section">
              <span class="location-name">{{ item.nombre }}</span>
            </div>

            <div class="metrics-section">
              <template v-if="segmentacionActiva === 'Geografía'">
                <div class="score-box">{{ item.score }}</div>
                <span class="client-count">{{ item.clientes }}</span>
              </template>
              <template v-else>
                <div @click="handleNegocioToggle($event, item.id)"
                     :class="['toggle-switch', itemAbierto === item.id ? 'is-green' : 'is-red']">
                  <div class="toggle-knob"></div>
                </div>
              </template>
            </div>

            <!-- Chevron centrado abajo -->
            <div class="chevron-container" v-if="segmentacionActiva === 'Geografía'">
              <svg class="chevron-down" :class="{ rotate: itemAbierto === item.id }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>

          <transition name="slide">
            <div v-if="itemAbierto === item.id" class="detail-pane">
              <div v-if="segmentacionActiva === 'Geografía'" class="detail-grid">
                <div class="detail-card">
                  <span class="detail-label">Promotores</span>
                  <span class="detail-value v-green">
                    <svg class="icon-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><path d="m18 15-6-6-6 6"/></svg>
                    {{ item.detalle.prom }}
                  </span>
                </div>
                <div class="detail-card">
                  <span class="detail-label">Pasivos</span>
                  <span class="detail-value v-yellow">{{ item.detalle.pas }}</span>
                </div>
                <div class="detail-card">
                  <span class="detail-label">Detractores</span>
                  <span class="detail-value v-red">
                    <svg class="icon-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><path d="m6 9 6 6 6-6"/></svg>
                    {{ item.detalle.det }}
                  </span>
                </div>
              </div>

              <div v-else class="business-table">
                <div class="table-header"><span>Negocio</span><span>Calificación IPN</span></div>
                <div v-for="neg in item.negocios" :key="neg.nombre" class="table-row">
                  <span class="neg-name">{{ neg.nombre }}</span>
                  <div class="bar-outer">
                    <div class="bar-inner" :class="neg.valor > 60 ? 'bar-green' : 'bar-red'" :style="{ width: neg.valor + '%' }">
                      <span class="bar-label">{{ neg.valor }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
/* --- ESTILOS IGUALES AL ANTERIOR --- */
.ranking-wrapper {
  font-family: 'Segoe UI', sans-serif;
  width: 100vw;
  margin-left: -16px;
  margin-right: -16px;
  box-sizing: border-box;
  /* El padding se maneja dentro de main-card o aquí si fuera necesario, pero main-card es la tarjeta */
}

.main-card {
  background: white;
  border-radius: 25px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
  width: 100%; /* Ocupa todo el ancho del wrapper */
  box-sizing: border-box;
}

.card-title { font-weight: 700; margin-bottom: 20px; font-size: 1.4rem; text-align: left; }

.segment-pill-container { display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; }
.segment-pill {
  border: 1px solid transparent; /* Reserva espacio para el borde */
  padding: 10px 30px;
  border-radius: 20px;
  background: #f0f2f8;
  color: #7a7e85;
  font-weight: 600;
  cursor: pointer;
  outline: none; /* Quita el borde de foco por defecto */
}
.segment-pill.active {
  background: #e30613;
  color: white;
  border-color: #e30613; /* Borde rojo al estar activo, igual que en Canales */
}

.ranking-item {
  display: flex;
  align-items: center;
  background: white;
  padding: 12px 12px 32px 12px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  cursor: pointer;
  position: relative; /* Necesario para el posicionamiento absoluto del badge y chevron */
  z-index: 10;
  transition: all 0.3s ease;
  overflow: hidden; /* Asegura que el badge no se salga de los bordes redondeados */
}
.item-expanded { border-bottom-left-radius: 0; border-bottom-right-radius: 0; box-shadow: none; border: 1px solid #eee; border-bottom: none; }
.no-cursor { cursor: default; }

.rank-badge {
  position: absolute; /* Posicionamiento absoluto */
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  border-radius: 15px 0 15px 0; /* Adaptado a la esquina superior izquierda */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  transition: 0.3s;
  flex-shrink: 0;
  margin: 0; /* Eliminar margen */
}
.bg-green { background-color: #34c759; }
.bg-gray { background-color: #bdc3c7; }

.name-section {
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 35px; /* Espacio para que el texto no quede debajo del badge */
}
.location-name { font-weight: 700; color: #444; font-size: 1.1rem; }

.chevron-container {
  position: absolute;
  bottom: 6px; /* Pegado al borde inferior */
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  pointer-events: none; /* Permite clicks en el item */
}
.chevron-down { width: 18px; color: #666; transition: 0.3s; display: block; }
.chevron-down.rotate { transform: rotate(180deg); }

.score-box { background: #eafaf1; color: #34c759; padding: 4px 12px; border-radius: 10px; font-weight: bold; font-size: 1.2rem; }

.client-count {
  position: absolute;
  bottom: 8px; /* Alineado verticalmente con el chevron */
  right: 12px; /* Alineado con el padding derecho */
  font-size: 0.8rem;
  color: #999;
  white-space: nowrap;
}

.toggle-switch { width: 48px; height: 24px; border-radius: 20px; position: relative; cursor: pointer; transition: 0.3s; }
.is-red { background: #e30613; }
.is-green { background: #34c759; }
.toggle-knob { position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; background: white; border-radius: 50%; transition: 0.3s; }
.is-green .toggle-knob { transform: translateX(24px); }

.detail-pane { background: #f8f9fa; border: 1px solid #eee; margin-top: -10px; padding: 30px 15px 15px; border-radius: 0 0 15px 15px; }
.business-table { background: white; border-radius: 12px; overflow: hidden; border: 1px solid #dfe4ea; }
.table-header { display: flex; justify-content: space-between; background: #a4b0be; padding: 8px 15px; color: white; font-size: 0.85rem; font-weight: 600; }
.table-row { display: flex; align-items: center; padding: 10px 15px; border-bottom: 1px solid #f1f2f6; }
.neg-name { flex: 0 0 45%; font-size: 0.85rem; color: #333; }
.bar-outer { flex: 1; background: #f1f2f6; height: 18px; border-radius: 10px; overflow: hidden; }
.bar-inner { height: 100%; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; border-radius: 10px; transition: width 0.6s ease; }
.bar-green { background: #34c759; }
.bar-red { background: #ff4757; }
.bar-label { color: white; font-size: 0.7rem; font-weight: 700; }

.detail-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.detail-card { background: white; padding: 12px 5px; border-radius: 12px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.03); }
.detail-label { display: block; font-size: 0.75rem; color: #777; font-weight: 600; margin-bottom: 5px; }
.detail-value { font-weight: bold; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 3px; }
.v-green { color: #34c759; }
.v-yellow { color: #f1c40f; }
.v-red { color: #e74c3c; }

.icon-up, .icon-down { width: 12px; height: 12px; }

.list-reorder-move { transition: transform 0.6s cubic-bezier(0.55, 0, 0.1, 1); }
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; max-height: 800px; overflow: hidden; }
.slide-enter-from, .slide-leave-to { max-height: 0; opacity: 0; }
</style>