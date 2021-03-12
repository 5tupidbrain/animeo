<template>
  <!-- <homeSlider/> -->
  <div class="Home container-lg px-sm-4">
    <div class="landing">
      <div class="landing_txtBox">
        <h2>Animeo</h2>
        <h4>Free Anime Website!</h4>
      </div>
    </div>
    <h4 class="col-12 display-6">Popular</h4>

    <div class="animeList">
      <ul class="items">
        <animeCard
          class="col-sm-5"
          v-for="data in animeData"
          :key="data.anime_id"
          :anime="data"
        >
        </animeCard>
      </ul>
    </div>
  </div>
</template>

<script>
import animeCard from "../components/animeCard.vue";
// import homeSlider from "../components/homeSlider.vue";

import { onMounted, ref } from "vue";

export default {
  setup() {
    let animeData = ref("");

    onMounted(() => {
      apiDataRetrive();
    });

    async function apiDataRetrive() {
      let req = "/Popular/1";

      let url = "http://localhost:3000" + req;

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          animeData.value = data;
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

<style scoped>
.landing {
  text-align: center;
  height: 50vh;
  position: relative;
}
.animeList {
  float: left;
  width: 100%;
}
.items{
  padding: 0 !important;
  display: flex;
  flex-wrap: wrap;
}
.items li {
  float: left;
  position: relative;
  text-align: center;
  list-style: none;
  margin-bottom: 20px;
  vertical-align: top;
}
.landing_txtBox {
  width: max-content;
  font-family: "Roboto", sans-serif;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.Home h4 {
  text-align: left;
}
@media screen and (max-width: 855px)  {
  .items{
    justify-content: center;
  }
}
</style>
