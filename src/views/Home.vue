<template>
  <!-- <homeSlider/> -->
  <div class="Home">
    <div class="landing">
      <div class="landing_txtBox">
        <h2 class="display-1">Animeo</h2>
        <p>(Currently in Beta)</p>
      </div>
      <img src="../assets/bg.svg" alt="" />
    </div>
    <div class="list container-lg px-sm-4 my-4">
      <h4 class="col-12 mx-4 display-6">Popular</h4>

      <div class="animeList" v-if="animeData">
        <ul class="items">
          <animeCard
            v-for="(data, index) in animeData"
            :key="index"
            :anime="data"
          >
          </animeCard>
        </ul>
        <button class="btn btn-primary" v-on:click="showMore()">
          Show more
        </button>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import animeCard from "../components/animeCard.vue";
// import homeSlider from "../components/homeSlider.vue";
import { onBeforeMount, onMounted, ref } from "vue";

export default {
  setup() {
    let animeData = ref([]);
    let animeNo = 1;

    onBeforeMount(() =>{
      document.title = 'Home - Animeo'
    })

    onMounted(() => {
      apiDataRetrive(animeNo);
    });
    function showMore() {
      animeNo += 1;
      apiDataRetrive(animeNo);
    }

    async function apiDataRetrive(pgNo) {
      let req = "/Popular/" + pgNo;

      let url = "https://animeo-api.herokuapp.com" + req;

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          animeData.value.push(data);
        });
      console.log(animeData);
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
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600&display=swap");

.landing {
  text-align: center;
  height: 50vh;
  position: relative;
  overflow: hidden;
}
.landing img {
  position: absolute;
  left: 0;
  z-index: -11;
  height: 100%;
  width: 100%;
  filter: brightness(60%) blur(5px);
  object-fit: cover;
}
.Home {
  height: fit-content;
  overflow: hidden;
}
.animeList {
  float: left;
  width: 100%;
  display: block;
}
.items {
  padding: 0 !important;
  display: flex;
  justify-content: center;
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
  font-family: "Oswald", sans-serif !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.Home h4 {
  text-align: left;
}
</style>
