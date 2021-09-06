<template>
  <!-- <homeSlider/> -->
  <div class="Home container-lg my-5">
    <h4 class="display-6">All Movies</h4>
    <div class="animeCardDiv">
      <animeCard v-for="(data, index) in animeData" :key="index" :anime="data">
      </animeCard>
    </div>
    <div class="loadMore">
      <span class="loadMoreSpan"></span>
      <button class=" btn" v-on:click="showMore()">
        Load more
      </button>
      <span class="loadMoreSpan"></span>
    </div>
  </div>
</template>

<script>
import animeCard from "../components/animeCard.vue";

import { onMounted, ref } from "vue";

export default {
  setup() {
    let animeData = ref([]);
    let pgNo = 1;
    onMounted(() => {
      // Loading();
      apiDataRetrive(pgNo);
    });
    // function Loading() {
    //   document.getElementById("baseData").style.display = "none";
    //   document.getElementById("loader").style.display = "flex";
    // }
    // function isLoaded() {
    //   document.getElementById("loader").style.display = "none";
    //   document.getElementById("baseData").style.display = "block";
    // }

    function showMore() {
      pgNo += 1;
      apiDataRetrive(pgNo);
    }
    async function apiDataRetrive(pgNo) {
      let url = "https://animeo-api.vercel.app/api/v1/Movies/" + pgNo;

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          animeData.value.push(data.movies);
          // isLoaded();
        });

      document.title = "Movies - Animeo" ;
    }
    return {
      apiDataRetrive,
      animeData,
      showMore,
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
.loadMore {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.loadMore button {
  min-width: max-content;
  background: transparent !important;
  box-shadow: none !important;
  color: #ffffff98;
}
.loadMore button:hover {
  box-shadow: none;
  color: #ffffffd5;
  background: none;
}
.loadMoreSpan {
  content: " ";
  height: 2px;
  width: 50%;
  float: left;
  background: rgba(255, 255, 255, 0.164);
}
.divider {
  content: " ";
  display: block;
  width: 100%;
  max-width: 120px;
  height: 2px;
  background: rgba(255, 255, 255, 0.164);
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
