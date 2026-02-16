<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HeaderNavigation from "./components/HeaderNavigation.vue";
import Buscador from "./components/Buscador.vue";
import ComponenteResumen from "./components/ComponenteResumen.vue";
import TacometroCard from "./components/TacometroCard.vue";
import VerbalizationsCard from "./components/VerbalizationsCard.vue";
import Footer from "./components/Footer.vue";
import Canales from "./components/Canales.vue";
import Ranking from "./components/Ranking.vue";
import type { ApiTacometroResponse, ApiVerbalizacion } from './types/ApiTypes';

// Estado compartido para el filtro de canales
const canalSeleccionado = ref('Formatos Propios');

// Estado para los datos del dashboard (Tacómetro y NPS)
const dashboardData = ref<ApiTacometroResponse | null>(null);

// Estado para las verbalizaciones
const verbalizations = ref<ApiVerbalizacion[]>([]);

// Simulación de carga de datos
onMounted(() => {
  // Simular respuesta de API Tacómetro
  dashboardData.value = {
    nivel: "PDV",
    tendencia: 0.2,
    califTaco: 55,
    promotores: 40, // Ajustado para coincidir con tu ejemplo visual anterior
    detractores: 20,
    pasivos: 30,
    totalclientes: 300
  };

  // Simular respuesta de API Verbalizaciones
  verbalizations.value = [
    { dato: "El servicio fue excelente y muy rápido.", cecodesc: "Sucursal Centro" },
    { dato: "No me gustó la atención recibida por el soporte.", cecodesc: "Call Center" },
    { dato: "La aplicación es fácil de usar.", cecodesc: "App Móvil" },
    { dato: "Deberían mejorar los tiempos de respuesta.", cecodesc: "Sucursal Norte" },
    { dato: "Muy satisfecho con la compra.", cecodesc: "Tienda Online" },
    { dato: "Volvería a comprar sin duda.", cecodesc: "Sucursal Sur" },
    { dato: "El precio es un poco alto para lo que ofrece.", cecodesc: "Kiosco" }
  ];
});
</script>

<template>
  <div class="app-container">
    <HeaderNavigation  />

    <main class="content">
      <Buscador />
      <router-view />

      <div class="cards-container">
        <!-- Canales actualiza la variable canalSeleccionado -->
        <Canales v-model:filtroActivo="canalSeleccionado" />

        <!-- Pasamos los datos al Tacómetro si existen -->
        <TacometroCard
            v-if="dashboardData"
            :percentage="dashboardData.califTaco"
            :clients="dashboardData.totalclientes"
            :trendValue="dashboardData.tendencia"
        />

        <!-- Pasamos los datos al Resumen NPS si existen -->
        <ComponenteResumen
            v-if="dashboardData"
            :detractores="dashboardData.detractores"
            :pasivos="dashboardData.pasivos"
            :promotores="dashboardData.promotores"
        />

        <!-- Ranking recibe la variable canalSeleccionado -->
        <Ranking :canalSeleccionado="canalSeleccionado" />

        <!-- VerbalizationsCard ahora recibe objetos ApiVerbalizacion -->
        <VerbalizationsCard :items="verbalizations" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style>
/* Estilos globales */
body {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  font-family: "Poppins", sans-serif;
}

.app-container {
  min-height: 100vh;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* IMPORTANTE: Como el nuevo Header tiene "position: fixed",
   necesitamos un margen superior para que el contenido no quede oculto debajo.
*/
.content {
  padding-top: 70px; /* Ajusta según la altura real de tu header */
  color: #333;
  flex: 1; /* Hace que el contenido ocupe el espacio restante empujando el footer */
  width: 100%;
  box-sizing: border-box;
}

.cards-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center; /* Centra las tarjetas si tienen ancho fijo */
  width: 100%;
  box-sizing: border-box;
}

/* Para que las tarjetas se estiren en móvil, podrías agregar esto globalmente o en cada componente */
@media (max-width: 600px) {
  .cards-container > * {
    width: 100% !important;
    max-width: none !important;
  }
}
</style>