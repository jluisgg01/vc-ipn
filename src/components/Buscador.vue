<script setup lang="ts">
import { ref } from 'vue';

// Definimos los eventos para que el padre reciba la búsqueda
const emit = defineEmits(['search', 'changeQuarter']);

const searchQuery = ref('');

const handleSearch = () => {
  emit('search', searchQuery.value);
};
</script>

<template>
  <div class="filters-container">
    <div class="search-wrapper">
      <div class="search-input-group">
        <span class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar Nombre de la Región o CECO"
            @input="handleSearch"
        />
      </div>
    </div>

    <div class="quarter-row">
      <span class="label">Trimestre</span>
      <div class="quarter-selector">
        <span class="quarter-text">
          <strong>Q4 S43</strong> 22/10/25 | 28/10/25
        </span>
        <span class="arrow-down">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filters-container {
  padding: 16px;
  background-color: #f8f9fa; /* Gris muy claro como en la imagen */
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input-group input {
  width: 100%;
  padding: 12px 12px 12px 45px;
  border-radius: 25px; /* Bordes muy redondeados como el XD */
  border: 1px solid #e0e0e0;
  font-size: 14px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.search-icon {
  position: absolute;
  left: 16px;
  color: #333;
}

.quarter-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  font-size: 14px;
  color: #555;
  font-weight: 500;
}

.quarter-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #efefef;
  flex-grow: 1;
  cursor: pointer;
}

.quarter-text {
  font-size: 13px;
  color: #666;
}

.quarter-text strong {
  color: #333;
  margin-right: 5px;
}

.arrow-down {
  color: #999;
}
</style>