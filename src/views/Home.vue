<template>
  <!-- <homeSlider/> -->
  <div class="Home">
    <div class="landing" id="landing">
      <div class="landing_txtBox">
        <img src="../assets/logo.png" alt="">
        <h2 class="display-1">Animeo</h2>
        <p>(Currently in Beta)</p>
      </div>
      <img src="../assets/bg.svg" alt="" />
    </div>
    <div class="list container-lg px-sm-4 my-4">
      <div class="animeList">
        <h4 class="col-12">Ongoing Series</h4>

        <button v-on:click="test('fwd')" class="scrollBtn fwd">❮</button>
        <ul class="items " id="animeScroll">
          <animeCard
            v-for="(data, index) in OngoingSeries"
            :key="index"
            :anime="data"
          >
          </animeCard>
          <li><span class="spaceBlock"></span></li>
        </ul>
        <button v-on:click="test('nxt')" class="scrollBtn next">❯</button>
      </div>

      <div class="animeList OngoingSeries">
        <h4>Popular</h4>
        <ul class="items " id="animeScroll">
          <animeCard
            v-for="(data, index) in animeData"
            :key="index"
            :anime="data"
          >
          </animeCard>
          <li><span class="spaceBlock"></span></li>
        </ul>
        <button class="btn btn-primary" v-on:click="showMore()">
          Show more
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import animeCard from "../components/animeCard.vue";
// import homeSlider from "../components/homeSlider.vue";
import { onMounted, ref } from "vue";

export default {
  setup() {
    let animeData = ref([]);
    let OngoingSeries = ref([]);
    let animeNo = 1;

    onMounted(() => {
      document.title = "Home - Animeo";
      Loading();
      apiOngoingSeries();
      apiDataRetrive(animeNo);
    });

    function showMore() {
      animeNo += 1;
      console.log(animeNo);
      apiDataRetrive(animeNo);
    }
    function Loading() {
      document.getElementById("baseData").style.display = "none";
      document.getElementById("loader").style.display = "flex";
    }
    function isLoaded() {
      document.getElementById("loader").style.display = "none";
      document.getElementById("baseData").style.display = "block";
    }

    async function apiDataRetrive(pgNo) {
      let req = "/Popular/" + pgNo;
      let url = "https://animeo-api.vercel.app/api/v1" + req;

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          animeData.value.push(data.popular);
        });
    }

    async function apiOngoingSeries() {
      let req = "/OngoingSeries/";

      let url = "https://animeo-api.vercel.app/api/v1" + req;

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          isLoaded();
          OngoingSeries.value.push(data.anime);
        });
    }

    let scrollMovePoint = 0;
    let max_scroll = 5317;
    function test(slidebtn) {
      let wrapper = document.getElementById("animeScroll");
      let operand = 552;

      // Calculate the number to move.
      if (slidebtn == "nxt") {
        if (scrollMovePoint < max_scroll) {
          scrollMovePoint = scrollMovePoint + operand;
        }
      } else if (slidebtn == "fwd") {
        if (0 < scrollMovePoint) {
          scrollMovePoint = scrollMovePoint - operand;
        }
      }
      wrapper.scrollTo(scrollMovePoint, 0);
    }

    return {
      apiDataRetrive,
      apiOngoingSeries,
      animeData,
      OngoingSeries,
      showMore,
      test,
      isLoaded,
    };
  },
  components: {
    animeCard,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600&display=swap");

::-webkit-scrollbar {
  display: none;
}
.scrollBtn {
  position: absolute;
  outline: 0;
  border: 0;
  border-radius: 50%;
  height: 42px;
  width: 42px;
  z-index: 9;
  text-align: center;
  background: #072f52;
  color: #3f97e4;
  top: 50%;
  transform: translateY(-50%);
}
.next {
  right: -10px;
}
.fwd {
  left: -10px;
}
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
.list h4 {
  margin-left: 12px;
}
.animeList {
  width: 100%;
  margin: 54px 0;
  display: block;
  padding: 0px 8px;
  position: relative;
}
.items {
  padding: 0 !important;
  margin: 0;
  display: flex;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
.items li {
  /* float: left; */
  position: relative;
  text-align: center;
  list-style: none;
  display: inline-block;
  margin-bottom: 20px;
  vertical-align: top;
}
.spaceBlock {
  width: 150px !important;
  height: 50px;
  margin-left: 1px;
}

.OngoingSeries ul {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
}
.landing_txtBox {
  width: max-content;
  font-family: "Oswald", sans-serif !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.landing_txtBox img{
  filter: brightness(50%) blur(4px);

}
.Home h4 {
  text-align: left;
}

@media screen and (max-width: 540px) {
  .scrollBtn {
    height: 32px;
    width: 32px;
    font-size: 14px;
  }
  .OngoingSeries ul li {
    width: 140px !important;
    min-width: fit-content !important;
  }
}
</style>
