<template>
  <div class="card-container">
    <div class="header">
      <h3 class="title">Calificación IPN</h3>
      <div :class="['trend-badge', trendValue >= 0 ? 'up' : 'down']">
        {{ trendValue >= 0 ? '↑' : '↓' }} {{ Math.abs(trendValue).toFixed(1) }} Vs SA
      </div>
    </div>

    <div class="gauge-wrapper">
      <svg viewBox="0 0 200 120" class="gauge-svg">
        <path d="M 30 100 A 70 70 0 0 1 170 100" fill="none" stroke="#e9ecef" stroke-width="12" stroke-linecap="round" />

        <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="#00a65a"
            stroke-width="12"
            stroke-linecap="round"
            :style="{ strokeDasharray: strokeDash }"
        />

        <!-- 4 divisiones (líneas blancas) separadas equidistantemente -->
        <line v-for="n in 4" :key="n"
          x1="164" y1="100" x2="176" y2="100"
          stroke="white"
          stroke-width="2"
          :transform="`rotate(${180 + (n * 36)}, 100, 100)`"
        />

        <line
            x1="100" y1="100" x2="150" y2="100"
            stroke="#adb5bd" stroke-width="3" stroke-linecap="round"
            :style="{ transform: needleRotation, transformOrigin: '100px 100px' }"
        />
        <circle cx="100" cy="100" r="4" fill="#adb5bd" />
      </svg>

      <div class="range-labels">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>

    <div class="footer">
      <div class="percentage-badge">{{ percentage }}%</div>
      <div class="client-count">{{ clients }} Clientes</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  percentage: number;
  clients: number;
  trendValue: number;
}

const props = defineProps<Props>();

// El arco del SVG va de 180 grados.
// Calculamos la rotación: 0% = -180deg, 100% = 0deg (aproximadamente según el diseño)
const needleRotation = computed(() => {
  const rotation = (props.percentage * 1.8) - 180;
  return `rotate(${rotation}deg)`;
});

// Controla qué tanto del arco se pinta de verde
const strokeDash = computed(() => {
  const totalLength = 220; // Longitud aproximada del arco
  const activeLength = (props.percentage / 100) * totalLength;
  return `${activeLength} ${totalLength}`;
});
</script>

<style scoped>
.card-container {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  width: 320px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  margin: 0;
  color: #444;
  font-size: 1.1rem;
}

.trend-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
}

.trend-badge.up { background: #e8f5e9; color: #2e7d32; }
.trend-badge.down { background: #ffebee; color: #c62828; }

.gauge-wrapper {
  position: relative;
  text-align: center;
}

.gauge-svg {
  width: 100%;
  height: auto;
}

.range-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  color: #adb5bd;
  font-weight: bold;
  font-size: 14px;
  margin-top: -15px;
}

.footer {
  text-align: center;
  margin-top: 10px;
}

.percentage-badge {
  display: inline-block;
  background: #e8f5e9;
  color: #00a65a;
  padding: 5px 15px;
  border-radius: 8px;
  font-size: 1.4rem;
  font-weight: 800;
}

.client-count {
  color: #6c757d;
  font-size: 13px;
  margin-top: 4px;
}
</style>