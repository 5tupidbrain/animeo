<template>
  <div class="container my-5">
    <div id="AnimeDetails">
      <div v-if="animeDet" class="d-flex flex-column">
        <div class=" animeInfo my-4 d-flex">
          <div>
            <img class="image" :src="`${animeDet.img}`" alt="" />
          </div>
          <div class="details my-auto mx-md-5">
            <h2 id="name" class="display-4 font-weight-bold">
              {{ animeDet.title }}
            </h2>
            <p><b>Released: </b>{{ animeDet.released }}</p>
            <p><b>Status:</b> {{ animeDet.status }}</p>
            <p><b>Other names: </b>{{ animeDet.otherName }}</p>
            <p><b>Genres:</b> {{ animeDet.genres }}</p>
            <p class="summary">
              <b>Summary: &nbsp; </b> {{ animeDet.synopsis.split(":")[1] }}
            </p>
          </div>
        </div>
        <div class="episodes_link my-4">
          <h5 class="text-left">Episodes</h5>
          <ul class="episode_list">
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
      console.log(animeDet);
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
img {
  height: 420px;
  width: auto;
  border-radius: 4px;
}
p{
  margin: 0 ;
}
.row {
  --bs-gutter-x: 0 !important;
}
.details {
  text-align: left;
  width: 100%;
}
.summary {
  margin-top: 16px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.animeInfo {
  flex-direction: row;
}
.episodes_link {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
}
.episode_list {
  justify-content: center;
  display: flex !important;
  flex-wrap: wrap;
  list-style: none;
  padding: 0 0 !important;
}
.episodes_link ul li a {
  text-decoration: none;
  color: white;
}
.epItem {
  padding: 10px 22px;
  width: 135px;
  background: rgba(255, 255, 255, 0.15);
  margin: 5px;
  display: inline-block;
}
@media screen and (max-width: 786px) {
  .animeInfo {
    flex-direction: column;
  }
  .details {
    text-align: justify !important;
    padding: 0 18px !important;
    margin: 48px 0 0 0 !important;
    width: 100%;
  }
}
</style>
