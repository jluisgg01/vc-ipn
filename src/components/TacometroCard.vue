<template>
  <div class="card-container">
    <div class="header">
      <h3 class="title">Calificación IPN</h3>
      <div :class="['trend-badge', trendValue >= 0 ? 'up' : 'down']">
        {{ trendValue >= 0 ? '↑' : '↓' }} {{ Math.abs(trendValue).toFixed(1) }} Vs SA
      </div>
    </div>

    <div class="gauge-wrapper">
      <!-- Reduced viewBox height to remove bottom space -->
      <svg viewBox="0 0 200 110" class="gauge-svg">
        <path d="M 30 100 A 70 70 0 0 1 170 100" fill="none" stroke="#e9ecef" stroke-width="8" stroke-linecap="round" />

        <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="#00a65a"
            stroke-width="8"
            stroke-linecap="round"
            :style="{ strokeDasharray: strokeDash }"
        />

        <!-- 4 divisiones (líneas blancas) separadas equidistantemente -->
        <line v-for="n in 4" :key="n"
          x1="164" y1="100" x2="176" y2="100"
          stroke="white"
          stroke-width="1"
          :transform="`rotate(${180 + (n * 36)}, 100, 100)`"
        />

        <line
            x1="100" y1="100" x2="150" y2="100"
            stroke="#adb5bd" stroke-width="3" stroke-linecap="round"
            :style="{ transform: needleRotation, transformOrigin: '100px 100px' }"
        />
        <circle cx="100" cy="100" r="4" fill="#adb5bd" />
      </svg>
    </div>

    <div class="gauge-footer">
      <span class="limit-label">0%</span>
      <div class="center-content">
        <div class="percentage-badge">{{ percentage }}%</div>
        <div class="client-count">{{ clients }} Clientes</div>
      </div>
      <span class="limit-label">100%</span>
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
  padding: 12px 16px; /* Mismo padding que HeaderNavigation */
  width: 100vw; /* Ocupa todo el ancho de la ventana */
  margin-left: -16px; /* Compensa el padding del contenedor padre */
  margin-right: -16px; /* Compensa el padding del contenedor padre */
  box-sizing: border-box; /* Incluye el padding en el ancho total */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Sombra más oscura */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0; /* Eliminado el margen inferior del header */
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
  line-height: 0; /* Elimina espacio extra debajo del SVG */
  margin-top: -30px; /* Sube el tacómetro para acercarlo al título */
}

.gauge-svg {
  width: 100%;
  height: auto;
  display: block;
}

.gauge-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Alinea los elementos arriba para que 0% y 100% coincidan con el número grande */
  padding: 0 10%; /* Ajuste para alinear visualmente con los extremos del arco */
  margin-top: -10px; /* Sube el footer para acercarlo al tacómetro */
}

.center-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.limit-label {
  color: #adb5bd;
  font-weight: bold;
  font-size: 14px;
  margin-top: 8px; /* Ajuste fino para alinear verticalmente con el texto del porcentaje */
}

.percentage-badge {
  display: inline-block;
  background: #e8f5e9;
  color: #00a65a;
  padding: 2px 15px;
  border-radius: 8px;
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1.2;
}

.client-count {
  color: #6c757d;
  font-size: 13px;
  margin-top: 2px;
}
</style>