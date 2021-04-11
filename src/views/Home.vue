<template>
  <!-- <homeSlider/> -->
  <div class="Home">
    <div class="landing">
      <div class="quote container">
        <h4>" {{ Quote.quote }} "</h4>
        <span class="divider my-2"></span>
        <p>{{ Quote.character }}</p>
        <small>{{ Quote.anime }}</small>
      </div>
      <img src="../assets/bg.svg" alt="" />
    </div>
    <div class="list container-lg px-sm-4 my-4">
      <div class="animeList OngoingSeries">
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

      <div class="animeList PopularSeries">
        <h4>Popular</h4>
        <div class="items " id="onScroll">
          <animeCard
            v-for="(data, index) in animeData"
            :key="index"
            :anime="data"
          >
          </animeCard>
          <div><span class="spaceBlock"></span></div>
        </div>
        <div class="loadMore">
          <span class="loadMoreSpan"></span>
          <button class=" btn" v-on:click="showMore()">
            Load more
          </button>
          <span class="loadMoreSpan"></span>
        </div>
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
    let Quote = ref("");
    let animeNo = 1;

    onMounted(() => {
      document.title = "Home - Animeo";
      Loading();
      animeQuote();
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

    async function animeQuote() {
      let url = "https://animechan.vercel.app/api/random";

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.quote.split("").length);
          if (data.quote.split("").length > 220) {
            animeQuote();
          } else {
            Quote.value = data;
          }
        });
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
      Quote,
    };
  },
  components: {
    animeCard,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600&display=swap");

.animeList > ::-webkit-scrollbar {
  display: none;
}
.scrollBtn {
  position: absolute;
  outline: 0;
  border: 0;
  border-radius: 50%;
  height: 42px;
  width: 42px;
  z-index: 999;
  text-align: center;
  background: #f6546a;
  color: #fff;
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
  min-height: 320px;
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

.quote {
  width: 100%;
  max-width: 720px;
  text-align: center;
  font-family: "Oswald", sans-serif !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.quote h4 {
  font-size: 1.5rem;
  text-align: center !important;
}
.quote p {
  font-size: 1.2rem;
  margin: 0;
}
.quote small {
  color: #ffffff98;
  font-size: 0.9rem;
}
.Home h4 {
  text-align: left;
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
  margin-bottom: 0 !important;
  display: block;
  padding: 0px 8px;
  position: relative;
}
.items {
  padding: 18px 10px !important;
  margin: 0;
  display: flex;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
.spaceBlock {
  width: 150px !important;
  height: 50px;
  margin-left: 1px;
}
.OngoingSeries > .items {
  display: flex !important;
}
.OngoingSeries > .items > .animeCard {
  min-width: 190px !important;
  max-width: 190px !important;
  margin: 12px 6px 20px;
}
.PopularSeries > .items {
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

@media only screen and (min-width: 580px) {
  .PopularSeries > .items {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .PopularSeries > .items {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 820px) {
  .PopularSeries > .items {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .PopularSeries > .items {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .PopularSeries > .items {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
}

@media screen and (max-width: 540px) {
  .scrollBtn {
    display: none;
  }

  .OngoingSeries > .items > .animeCard,
  .items > .animeCard {
    min-width: 150px !important;
  }
  .animeCard > a > div > img {
    max-height: 200px;
  }
  .quote h4 {
    font-size: 1.2rem;
    font-weight: normal;
  }
  .quote p {
    font-size: 0.9rem;
  }
  .quote small {
    font-size: 0.8rem;
  }
}
</style>
