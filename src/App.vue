<script setup lang="ts">
import HeaderNavigation from "./components/HeaderNavigation.vue";
import Buscador from "./components/Buscador.vue";
import ComponenteResumen from "./components/ComponenteResumen.vue";
import TacometroCard from "./components/TacometroCard.vue";
import VerbalizationsCard from "./components/VerbalizationsCard.vue";
import Footer from "./components/Footer.vue";
import Canales from "./components/Canales.vue";
import Ranking from "./components/Ranking.vue";

const verbalizations = [
  "El servicio fue excelente y muy rápido.",
  "No me gustó la atención recibida por el soporte.",
  "La aplicación es fácil de usar.",
  "Deberían mejorar los tiempos de respuesta.",
  "Muy satisfecho con la compra.",
  "Volvería a comprar sin duda.",
  "El precio es un poco alto para lo que ofrece."
];
</script>

<template>
  <div class="app-container">
    <HeaderNavigation  />

    <main class="content">
      <Buscador />
      <router-view />

      <div class="cards-container">
        <Canales />
        <TacometroCard
            :percentage="55"
            :clients="300"
            :trendValue="0.2"
        />
        <ComponenteResumen :detractores="20" :pasivos="30" :promotores="40" />
        <Ranking />
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