<template>
  <!-- <homeSlider/> -->
  <div class="Home container-lg">
    <h4 class="display-6">Search Results</h4>

    <div class="animeCardDiv my-4 d-flex flex-wrap justify-content-center">
      <animeCard v-for="(data, index) in animeData" :key="index" :anime="data">
      </animeCard>
    </div>
  </div>
</template>

<script>
import animeCard from "../components/animeCard.vue";
// import homeSlider from "../components/homeSlider.vue";

import { onMounted, ref } from "vue";

export default {
  setup() {
    let animeName = window.location.href.split("/")[4];
    let animeData = ref([]);

    onMounted(() => {
      apiDataRetrive(animeName);
      console.log(animeName);
      console.log(animeData);
    });

    async function apiDataRetrive(animeName) {
      let url = "https://animeo-api.herokuapp.com/search/" + animeName;

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          animeData.value.push(data);
        });
    }
    return {
      apiDataRetrive,
      animeData,
    };
  },
  components: {
    animeCard,
  },
};
</script>

<style></style>
