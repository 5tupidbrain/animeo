<template>
  <!-- <homeSlider/> -->
  <div class="Home container-lg">
    <h4 class="display-6">Search Results</h4>
    <div class="animeCardDiv my-4 ">
      <animeCard v-for="(data, index) in animeData" :key="index" :anime="data">
      </animeCard>
    </div>
  </div>
</template>

<script>
import animeCard from "../components/animeCard.vue";

import { onMounted, ref } from "vue";

export default {
  setup() {
    let animeName = window.location.href.split("/")[4];
    let animeData = ref([]);

    onMounted(() => {
      Loading();
      apiDataRetrive(animeName);
    });
    function Loading() {
      document.getElementById("baseData").style.display = "none";
      document.getElementById("loader").style.display = "flex";
    }
    function isLoaded() {
      document.getElementById("loader").style.display = "none";
      document.getElementById("baseData").style.display = "block";
    }
    async function apiDataRetrive(animeName) {
      let url = "https://animeo-api.vercel.app/api/v1/Search/" + animeName;

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          animeData.value.push(data.search);
          isLoaded();
        });

      document.title = "Search - " + animeName;
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
h4 {
  font-weight: bold !important;
  padding: 16px;
}
.animeCardDiv {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 16px;
}
@media only screen and (min-width: 640px) {
  .animeCardDiv {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .animeCardDiv {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 820px) {
  .animeCardDiv {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .animeCardDiv {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .animeCardDiv {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
