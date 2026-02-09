<script setup lang="ts">
import HeaderNavigation from "./components/HeaderNavigation.vue";
import Buscador from "./components/Buscador.vue";
import ComponenteResumen from "./components/ComponenteResumen.vue";
import TacometroCard from "./components/TacometroCard.vue";

</script>

<template>
  <div class="app-container">
    <HeaderNavigation  />

    <main class="content">
      <Buscador />
      <router-view />
    </main>
    
    <ComponenteResumen :detractores="20" :pasivos="30" :promotores="40" />
    <TacometroCard
        :percentage="55"
        :clients="300"
        :trendValue="0.2"
    />

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
}

/* IMPORTANTE: Como el nuevo Header tiene "position: fixed",
   necesitamos un margen superior para que el contenido no quede oculto debajo.
*/
.content {
  padding-top: 70px; /* Ajusta según la altura real de tu header */
  color: #333;
}
</style>