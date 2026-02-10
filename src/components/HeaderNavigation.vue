<script setup lang="ts">

import CircularButton from './items/CircularButton.vue';
import { Str } from "../utils/AppConstants";
import backIcon from '../assets/icons/ic_back_arrow.svg';

const headerTitle = Str.headerName;

interface Props {

  title: string;

}



defineProps<Props>();

const emit = defineEmits<{ (e: 'back'): void }>();

</script>



<template>

  <header class="header-navigation">

    <div class="header-container">

      <CircularButton

          :click-handler="() => emit('back')"

          :icon-src="backIcon"

      />

      <h1 class="header-title">
        {{headerTitle}}
      </h1>

    </div>

  </header>

</template>



<style scoped>

.header-navigation {

  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

}

.logo h1 {
  font-family: 'Poppins', sans-serif; /* Asegúrate de usar la fuente del XD */
  font-weight: 700;
  font-size: 18px;
  color: #2c3e50; /* Color oscuro del diseño */
  margin-left: 10px; /* Separación de la flecha */
}


.header-container {

  display: flex;

  align-items: center;

  gap: 16px;

  width: 100%;

}



.header-title {

  font-size: 1rem;

  font-weight: 700;

  color: #2c3338;

  margin: 0;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

}

</style>