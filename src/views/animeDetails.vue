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
              Ep
              <b v-if="animeDet.totalEpisodes">{{ animeDet.totalEpisodes }}</b>
              <b v-else>0</b>
            </h2>
            <router-link
              :to="{
                name: 'animeEp',
                params: {
                  animeName: anime_id,
                  animeEpisode: animeDet.episodes[0].id,
                },
              }"
              class="watchNow"
            >
              Watch now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="playIcon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>
            <ul class="genres">
              <li v-for="genre in animeDet.genres" :key="genre">{{ genre }}</li>
            </ul>
            <p class="summary">
              {{ animeDet.synopsis.split(":")[1] }}
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
                Ep {{ index + 1 }}
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
    let anime_id = decodeURI(window.location.href.split("/")[4]);
    anime_id = anime_id
      .split(" ")
      .join("-")
      .toLowerCase();

    onMounted(() => {
      Loading()
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
          isLoaded()
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
*{
  scrollbar-width: 0;
}
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
.watchNow {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 25px;
  color: #fff;
  margin: 12px 0px;
  display: block;
  width: 140px;
  transition: 0.2s ease-in;
}
.watchNow:hover {
  background: rgba(255, 255, 255, 0.2);
}
.playIcon {
  height: 24px;
  width: 24px;
}
.row {
  --bs-gutter-x: 0 !important;
}
.AnimeDetails {
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
.animePoster {
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
  margin-top: 12px;
  padding: 0;
  overflow-x: scroll;
  display: flex;
}
.genres li {
  display: inline-block;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 4px 10px;
  margin-right: 6px;
  font-size: 10px;
  text-transform: uppercase;
  white-space: nowrap;
}episodes_link {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  text-align: center;
}
.episode_list {
  height: 320px;
  flex-wrap: nowrap;
  overflow-y: scroll;
  list-style: none;
  padding: 0 6px;
}
.episode_list li {
  display: inline-block;
}
.epItem {
  width: 98px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.04);
  display: inline-block;
  font-size: 14px;
  margin: 2px;
  display: inline-block;
  border-radius: 4px;
  text-decoration: none;
  color: white;
}
.epItem:hover{
  background: rgba(255, 255, 255, 0.2);
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
  .summary {
    text-align: justify !important;
  }
  .animePoster {
    width: 100% !important;
    object-fit: cover;
  }
}
</style>
