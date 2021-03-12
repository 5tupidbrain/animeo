<template>
  <div class="container my-5">
    <div v-if="animeDet" class="d-flex flex-column">
      <div class="my-4 d-flex flex-row">
        <div>
          <img class="image" :src="`${animeDet.img_url}`" alt="" />
        </div>
        <div class="details my-auto mx-5">
          <h2 class="display-4 font-weight-bold">{{ animeDet.name }}</h2>
          <p class=""><b>Summary: &nbsp; </b> {{ animeDet.about }}</p>
        </div>
      </div>
      <div class="episodes_link my-4">
        <h5 class="text-left">Episodes</h5>
        <div class="episode_list">
          <router-link
            :to="{
              name: 'animeEp',
              params: {
                animeName: anime_id,
                animeEpisode: item,
              },
            }"
            v-for="(item, index) in animeDet.episode_id"
            :key="index"
            class="epItem"
          >
            Episode {{ index + 1 }}
          </router-link>
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
    let url = "https://animeo-api.herokuapp.com/getAnime/";
    let anime_id = window.location.href.split("/")[4];
    onMounted(() => {
      animeDetails(anime_id);
    });

    async function animeDetails(id) {
      await fetch(url + id)
        .then((response) => response.json())
        .then((data) => {
          animeDet.value = data;
        });
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
.episodes_link {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}
.episodes_link div a {
  text-decoration: none;
  color: white;
}
.epItem {
  padding: 10px 22px;
  width: 130px;
  background: rgba(255, 255, 255, 0.15);
  margin: 5px;
  display: inline-block;
}
</style>
