<template>
  <div class="container-md my-5">
    <div class="title m-4">
      <h4 class="display-5 font-weight-bold text-capitalize">
        {{ animeName }}
      </h4>
      <small>{{ epName }}</small>
    </div>

    <div class="epPlayer mx-auto my-5">
      <video controls playsinline>
        <source
          v-for="ep in metaMedia"
          :key="ep"
          :src="`${ep.ep_link}`"
          :label="`${ep.quality}`"
          type="video/mp4"
        />
      </video>
    </div>
    <div class="episodes_link m-4">
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
            v-for="(item, index) in epList.episode_id"
            :key="index"
            class="epItem"
          >
            Episode {{ index + 1 }}
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    let animeName = window.location.href.split("/")[3];
    let epName = window.location.href.split("/")[4];
    let metaMedia = ref("");
    let epList = ref("");
    let url = "https://animeo-api.herokuapp.com/getEpisode/";

    onMounted(() => {
      episodeMedia(epName);
      episodeList(animeName);
    });

    async function episodeList(animeName) {
      let url = 'https://animeo-api.herokuapp.com/getAnime/'
      await fetch(url+animeName)
        .then((response) => response.json())
        .then((data) => {
          epList.value = data;
        });
    }

    async function episodeMedia(epName) {
      await fetch(url + epName)
        .then((response) => response.json())
        .then((data) => {
          metaMedia.value = data;
        });
    }
    return {
      episodeMedia,
      metaMedia,
      animeName,
      epName,
      epList,
      episodeList,
    };
  },
};
</script>
<style scoped>
small {
  font-weight: normal;
  font-size: 1.2em;
  text-transform: capitalize;
}
.title {
  text-align: left;
}
.title h4 {
  margin: 0;
}
.epPlayer {
  max-width: 1024px;
}
.epPlayer video {
  border-radius: 4px;
  object-fit: cover;
  width: 100%;
}
.watch_more h4{
  text-align: left;
}
.profile-card-2 img{
  height: 320px !important;
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
