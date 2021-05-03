<template>
  <div class="container-md my-5 d-flex justify-content-center">
    <div class="AnimeDetails">
      <div v-if="animeDet" class="d-flex flex-column">
        <div class=" animeInfo my-4 d-flex">
          <div>
            <img class="animePoster" :src="`${animeDet.img}`" alt="" />
          </div>
          <div class="details my-auto px-md-5">
            <h2 id="name" class="display-4 font-weight-bold">
              {{ animeDet.title }}
            </h2>
            <h2 class="releasedEp">
              {{ animeDet.status }}

              <span>· </span>
              {{ animeDet.released }}
              <span> · </span>
              <b v-if="animeDet.totalEpisodes">{{ animeDet.totalEpisodes }}</b>
              <b v-else>0</b>
              Episodes
            </h2>
            <ul class="genres">
              <li v-for="genre in animeDet.genres" :key="genre">{{ genre }}</li>
            </ul>
            <p class="summary">
              <b>Summary: &nbsp; </b> {{ animeDet.synopsis.split(":")[1] }}
            </p>
          </div>
        </div>
        <div class="episodes_link my-4">
          <h5 class="text-left">Episodes</h5>
          <ul class="episode_list mx-auto">
            <li v-for="(item, index) in animeDet.episodes" :key="index">
              <router-link
                :to="{
                  name: 'animeEp',
                  params: {
                    animeName: anime_id,
                    animeEpisode: item.id,
                  },
                }"
                class="epItem"
              >
                Episode {{ index + 1 }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    let animeDet = ref("");
    let url = "https://animeo-api.vercel.app/api/v1/search/";
    let anime_id = window.location.href.split("/")[4];

    onMounted(() => {
      Loading();
      animeDetails(anime_id);
    });
    function Loading() {
      document.getElementById("baseData").style.display = "none";
      document.getElementById("loader").style.display = "flex";
    }
    function isLoaded() {
      document.getElementById("loader").style.display = "none";
      document.getElementById("baseData").style.display = "block";
    }

    async function animeDetails(id) {
      await fetch(url + id)
        .then((response) => response.json())
        .then((data) => {
          animeDet.value = data.search[0];
          isLoaded();
        });

      let anime_name = document.getElementById("name").innerText;
      document.title = anime_name + " - Animeo";
    }
    return {
      animeDetails,
      animeDet,
      anime_id,
    };
  },
  props: {
    animeid: String,
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
img {
  height: 420px;
  width: auto;
  border-radius: 4px;
}
p {
  margin: 0;
}
.row {
  --bs-gutter-x: 0 !important;
}
.AnimeDetails{
  max-width: 1120px;
  width: 100%;
}
.details {
  text-align: left;
  width: 100%;
}
.summary {
  margin-top: 16px !important;
}
.animePoster{
  box-shadow: 0 0px 30px -10px #f6546aa8;
}
.animeInfo {
  flex-direction: row;
}
.releasedEp {
  font-size: 1rem !important;
  font-weight: bold;
}
.genres {
  color: #000;
  width: 100%;
  list-style-type: none;
  margin: 0;
  margin-top: 46px;
  padding: 0;
  overflow-x: scroll;
  display: flex;
}
.genres li {
  display: inline-block;
  background: rgb(222, 224, 247, 0.5);
  border-radius: 20px;
  padding: 4px 10px;
  margin-right: 6px;
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;
  white-space: nowrap;
}
.episodes_link {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  text-align: center;
}
.episode_list {
  display: flex !important;
  padding: 0 0 !important;
  justify-content: center;
  width: 90%;
  flex-wrap: wrap;
  list-style: none;
}
.episode_list li{
  /* float: left; */
  display: inline-block;
}
.episodes_link ul li a {
  text-decoration: none;
  color: white;
}
.epItem {
  padding: 10px 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 135px;
  height: 50px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.15);
  margin: 5px;
  /* display: inline-block; */
}
@media screen and (max-width: 786px) {
  .animeInfo {
    flex-direction: column;
  }
  .details {
    padding: 0 18px !important;
    margin: 48px 0 0 0 !important;
    width: 100%;
  }
  .summary{
    text-align: justify !important;
  }
  .animePoster{
    width: 100% !important;
    object-fit: cover;
  }
}
</style>
