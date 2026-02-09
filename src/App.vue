<script setup lang="ts">
import HeaderNavigation from "./components/HeaderNavigation.vue";
import Buscador from "./components/Buscador.vue";

</script>

<template>
  <div class="app-container">
    <HeaderNavigation />

    <main class="content">
      <Buscador />
      <router-view />
    </main>
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