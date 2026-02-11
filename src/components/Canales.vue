<script setup>
import { ref, computed, watch } from 'vue';

// 1. Estado para el filtro seleccionado
const filtroActivo = ref('Formatos Propios');

// 2. Opciones de filtros
const opciones = ['Formatos Propios', 'Canales Terceros', 'Presta Prenda'];

// 3. Datos de ejemplo (Normalmente vendrían de una API o Props)
const datosCanales = {
  'Formatos Propios': {
    titulo: 'Red',
    periodo: 'Trimestral',
    corte: 'Con corte a Enero',
    rango: 'S40 a S45',
    badge: 'Q1'
  },
  'Canales Terceros': {
    titulo: 'Division del Norte',
    periodo: 'Trimestral',
    corte: 'Con corte a Enero',
    rango: 'S40 a S45',
    badge: 'Q1'
  },
  'Presta Prenda': {
    titulo: 'Baja California Sur',
    periodo: 'Trimestral',
    corte: 'Con corte a Enero',
    rango: 'S40 a S45',
    badge: 'Q1'
  }
};

// 4. Propiedad computada para obtener los datos según el filtro
const infoFiltrada = computed(() => datosCanales[filtroActivo.value]);

// Emitir el filtro activo
const emit = defineEmits(['update:filtroActivo']);

// Observar cambios en filtroActivo y emitir el evento
watch(filtroActivo, (newValue) => {
  emit('update:filtroActivo', newValue);
}, { immediate: true }); // Emitir el valor inicial inmediatamente

</script>

<template>
  <div class="canales-container">
    <div class="filtros-header">
      <button
          v-for="opcion in opciones"
          :key="opcion"
          :class="['filtro-btn', { activo: filtroActivo === opcion }]"
          @click="filtroActivo = opcion"
      >
        {{ opcion }}
      </button>
    </div>

    <div class="card-info">
      <div class="card-body">
        <div class="text-content">
          <h2 class="titulo">{{ infoFiltrada.titulo }}</h2>
          <p class="periodo">{{ infoFiltrada.periodo }}</p>
          <p class="corte">{{ infoFiltrada.corte }}</p>
          <p class="rango">{{ infoFiltrada.rango }}</p>
        </div>
        <div class="badge-container">
          <span class="badge-q">
            {{ infoFiltrada.badge }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.canales-container {
  font-family: 'Segoe UI', Roboto, sans-serif;
  width: 100%; /* Ocupa todo el ancho disponible */
  box-sizing: border-box; /* Incluye el padding en el ancho total */
  padding: 12px 16px; /* Mismo padding que HeaderNavigation */
}

/* Estilos de los botones de filtro */
.filtros-header {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  justify-content: flex-start; /* Alineado a la izquierda */
  overflow-x: auto; /* Permite scroll horizontal si los botones no caben */
  padding-bottom: 5px; /* Espacio para el scrollbar si aparece */
}

.filtro-btn {
  background-color: #f0f2f8;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 8px 16px;
  color: #5f6368;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  outline: none; /* Elimina el borde de foco predeterminado del navegador */
  white-space: nowrap; /* Evita que el texto se rompa */
}

.filtro-btn:focus {
  outline: none; /* Asegura que no aparezca al hacer clic */
}

.filtro-btn.activo {
  background-color: #E31C1C;
  color: #ffffff;
  font-weight: bold;
  border-color: #E31C1C;
}

/* Estilos de la tarjeta */
.card-info {
  background: white;
  border-radius: 12px;
  padding: 15px;
  /* Eliminé el borde para que se vea limpio como en la imagen,
     puedes agregar shadow si gustas */
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.text-content {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0; /* Elimina el espacio entre elementos flex */
}

.titulo {
  margin: 0;
  font-size: 1.4rem;
  color: #333;
  font-weight: 700;
  line-height: 1.2; /* Ajusta la altura de línea */
}

.periodo {
  margin: 0; /* Elimina margen */
  color: #28a745; /* Verde de la imagen */
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.2;
}

.corte {
  margin: 0; /* Elimina margen */
  color: #888;
  font-size: 0.95rem;
  line-height: 1.2;
}

.rango {
  margin: 0; /* Elimina margen */
  color: #999;
  font-style: italic;
  font-size: 0.9rem;
  line-height: 1.2;
}

/* Estilo del badge verde (Q1) */
.badge-q {
  background-color: #34c749;
  color: white;
  padding: 4px 30px;
  border-bottom-left-radius: 20px; /* Borde redondeado inferior izquierdo */
  border-top-right-radius: 20px; /* Borde redondeado superior derecho */
  border-top-left-radius: 0; /* Sin borde redondeado superior izquierdo */
  border-bottom-right-radius: 0; /* Sin borde redondeado inferior derecho */
  font-size: 20px; /* Tamaño de fuente ajustado */
  font-weight: 600;
}
</style>