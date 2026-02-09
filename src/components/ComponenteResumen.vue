<template>
  <div class="nps-container">
    <div v-for="item in summaryItems" :key="item.label" class="nps-card">
      <span class="nps-label">{{ item.label }}</span>
      <div :class="['nps-value', item.type]">
        <span v-if="item.trend === 'up'" class="arrow">↑</span>
        <span v-if="item.trend === 'down'" class="arrow">↓</span>
        {{ item.value.toFixed(2) }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Definimos la interfaz para las propiedades
interface Props {
  promotores: number;
  pasivos: number;
  detractores: number;
}

const props = defineProps<Props>();

// Estructuramos los datos para iterar fácilmente
const summaryItems = computed(() => [
  { label: 'Promotores', value: props.promotores, type: 'promoter', trend: 'up' },
  { label: 'Pasivos', value: props.pasivos, type: 'passive', trend: null },
  { label: 'Detractores', value: props.detractores, type: 'detractor', trend: 'down' }
]);
</script>

<style scoped>
.nps-container {
  display: flex;
  gap: 16px;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
}

.nps-card {
  background-color: #f8f9fa;
  padding: 16px 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  flex: 1;
}

.nps-label {
  font-size: 14px;
  font-weight: 700;
  color: #555;
  margin-bottom: 4px;
}

.nps-value {
  font-size: 18px;
  font-weight: 700;
}

.arrow {
  margin-right: 2px;
  font-weight: bold;
}

/* Colores dinámicos según el tipo */
.promoter { color: #4caf50; } /* Verde */
.passive { color: #ffb74d; }  /* Naranja/Amarillo */
.detractor { color: #ef5350; } /* Rojo */
</style>