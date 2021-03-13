<template>
  <div class="container my-5">
    <div v-if="animeDet" class="d-flex flex-column">
      <div class=" animeInfo my-4 d-flex">
        <div>
          <img class="image" :src="`${animeDet.img_url}`" alt="" />
        </div>
        <div class="details my-auto mx-md-5">
          <h2 id="name" class="display-4 font-weight-bold">
            {{ animeDet.name }}
          </h2>
          <p class=""><b>Summary: &nbsp; </b> {{ animeDet.about }}</p>
        </div>
      </div>
      <div class="episodes_link my-4">
        <h5 class="text-left">Episodes</h5>
        <ul class="episode_list">
          <li v-for="(item, index) in animeDet.episode_id" :key="index">
            <router-link
              :to="{
                name: 'animeEp',
                params: {
                  animeName: anime_id,
                  animeEpisode: item,
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
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    let animeDet = ref("");
    let url = "https://animeo-api.herokuapp.com/getAnime/";
    let anime_id = window.location.href.split("/")[4];
    onMounted(() => {
      animeDetails(anime_id);
      console.log(animeDet);
    });

    async function animeDetails(id) {
      await fetch(url + id)
        .then((response) => response.json())
        .then((data) => {
          animeDet.value = data;
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
.row {
  --bs-gutter-x: 0 !important;
}
.details {
  text-align: left;
  width: 100%;
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
