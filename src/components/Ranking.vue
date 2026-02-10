¡Claro! Vamos a integrar el SVG Chevron directamente en la estructura de Ranking.vue. He refinado el código para que sea más limpio y profesional, aprovechando las capacidades de WebStorm para manejar componentes SFC (Single File Component).

Aquí tienes el componente completo con la flecha programada y el detalle desplegable:

Ranking.vue
Fragmento de código
<script setup>
import { ref, computed } from 'vue';

// --- ESTADO ---
const canalSeleccionado = ref('Formatos Propios');
const segmentacionActiva = ref('Geografía');
const itemAbierto = ref(null); // ID del ítem que está expandido

// --- MÉTODOS ---
const toggleItem = (id) => {
  itemAbierto.value = itemAbierto.value === id ? null : id;
};

// --- DATOS (Reglas de Negocio) ---
const baseDeDatos = {
  'Formatos Propios': {
    header: { titulo: 'Red', periodo: 'Trimestral', corte: 'Enero', rango: '$40 a $45', badge: 'Q1' },
    Geografía: [
      {
        id: 1, nombre: 'Baja California Sur', score: '72.08', clientes: '300 clientes',
        detalle: { prom: '77.41%', pas: '11.63%', det: '10.40%' }
      },
      {
        id: 2, nombre: 'Norte', score: '68.54', clientes: '300 clientes',
        detalle: { prom: '65.10%', pas: '20.00%', det: '14.90%' }
      },
      {
        id: 3, nombre: 'Sur', score: '63.85', clientes: '300 clientes',
        detalle: { prom: '50.00%', pas: '30.00%', det: '20.00%' }
      }
    ],
    Negocio: []
  }
};

const dataActual = computed(() => baseDeDatos[canalSeleccionado.value] || { header: {}, Geografía: [] });
const rankingFiltrado = computed(() => dataActual.value[segmentacionActiva.value] || []);
</script>

<template>
  <div class="ranking-wrapper">
    <div class="tabs-canales">
      <button
          v-for="c in ['Formatos Propios', 'Canales Terceros', 'Presta Prenda']"
          :key="c" @click="canalSeleccionado = c"
          :class="['tab-btn', { 'tab-active': canalSeleccionado === c }]"
      >
        {{ c }}
      </button>
    </div>

    <div class="main-card">
      <h3 class="card-title">Calificación IPN (Territorios)</h3>

      <div class="segment-pill-container">
        <button
            v-for="t in ['Geografía', 'Negocio']" :key="t"
            @click="segmentacionActiva = t"
            :class="['segment-pill', { 'active': segmentacionActiva === t }]"
        >
          {{ t }}
        </button>
      </div>

      <div class="list-container">
        <div v-for="item in rankingFiltrado" :key="item.id" class="ranking-group">

          <div :class="['ranking-item', { 'item-expanded': itemAbierto === item.id }]" @click="toggleItem(item.id)">
            <div class="rank-badge">{{ item.id }}</div>

            <div class="name-section">
              <span class="location-name">{{ item.nombre }}</span>
              <div class="chevron-container">
                <svg
                    class="chevron-down"
                    :class="{ 'rotate': itemAbierto === item.id }"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>

            <div class="metrics-section">
              <div class="score-box">{{ item.score }}</div>
              <span class="client-count">{{ item.clientes }}</span>
            </div>

            <div class="next-arrow">❯</div>
          </div>

          <transition name="slide">
            <div v-if="itemAbierto === item.id" class="detail-pane">
              <div class="detail-grid">
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
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estructura Base */
.ranking-wrapper { font-family: 'Segoe UI', sans-serif; width: 100%; padding: 0; background: transparent; box-sizing: border-box; }

/* Botones Superiores */
.tabs-canales { display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 5px; }
.tab-btn { border: none; padding: 8px 16px; border-radius: 20px; background: #f0f2f5; color: #555; cursor: pointer; font-weight: 600; white-space: nowrap; }
.tab-active { background: #e30613; color: white; }

/* Card Blanca */
.main-card { background: white; border-radius: 25px; padding: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.06); width: 100%; box-sizing: border-box; }
.card-title { text-align: left; color: #333; margin-bottom: 15px; font-size: 1.4rem; font-weight: 700; }

/* Segment Pills (Geografía/Negocio) */
.segment-pill-container { display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; }
.segment-pill { border: none; padding: 10px 30px; border-radius: 20px; background: #f0f2f8; color: #7a7e85; font-weight: 600; cursor: pointer; }
.segment-pill.active { background: #e30613; color: white; }

/* Ranking Items */
.ranking-group { margin-bottom: 15px; }
.ranking-item {
  display: flex; align-items: center; background: white; padding: 12px;
  border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  cursor: pointer; position: relative; z-index: 10; transition: transform 0.2s;
}
.item-expanded { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }

.rank-badge {
  background: #34c759; color: white; width: 32px; height: 32px;
  border-radius: 6px 16px 6px 16px; display: flex; align-items: center; justify-content: center;
  font-weight: bold; margin-right: 15px; flex-shrink: 0;
}

.name-section { flex: 1; display: flex; flex-direction: row; align-items: center; gap: 10px; }
.location-name { font-weight: 700; color: #444; font-size: 1.1rem; }

/* ESTILO DEL CHEVRON SVG */
.chevron-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Asegura que ocupe la altura de la línea */
  padding-top: 4px; /* Baja el contenedor completo */
}

.chevron-down { width: 18px; height: 18px; color: #666; transition: transform 0.3s ease; display: block; }
.chevron-down.rotate { transform: rotate(180deg); }

.metrics-section { display: flex; flex-direction: column; align-items: flex-end; margin-left: 10px; }
.score-box { background: #eafaf1; color: #34c759; padding: 4px 12px; border-radius: 10px; font-weight: bold; font-size: 1.2rem; white-space: nowrap; }
.client-count { font-size: 0.8rem; color: #999; text-align: right; display: block; white-space: nowrap; }
.next-arrow { color: #ccc; margin-left: 15px; font-size: 0.9rem; }

/* Panel de Detalle */
.detail-pane {
  background: #f8f9fa; border: 1px solid #eee; margin-top: -10px;
  padding: 30px 15px 15px; border-radius: 0 0 15px 15px;
}
.detail-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.detail-card { background: white; padding: 12px 5px; border-radius: 12px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.03); }
.detail-label { display: block; font-size: 0.75rem; color: #777; font-weight: 600; margin-bottom: 5px; }
.detail-value { font-weight: bold; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 3px; flex-wrap: wrap; }

.v-green { color: #34c759; }
.v-yellow { color: #f1c40f; }
.v-red { color: #e74c3c; }

.icon-up, .icon-down { width: 12px; height: 12px; }

/* Animación slide */
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease-out; max-height: 200px; overflow: hidden; }
.slide-enter-from, .slide-leave-to { max-height: 0; opacity: 0; transform: translateY(-10px); }
</style>