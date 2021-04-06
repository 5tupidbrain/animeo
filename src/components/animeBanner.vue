<template>
  <main class="animeBanner" v-if="animeData">
    <img :src="`${animeData.coverImage.original}`" alt="" />
    <div class="animeInfo">
      <h2 class="animeName">
        {{ animeData.name }}
      </h2>
      <p>{{ animeData.description }}</p>
    </div>
  </main>
</template>
<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    let animeSelect = "horimiya";
    let animeData = ref("");
    let url = "https://kitsu.io/api/edge/anime?filter[text]=" + animeSelect;

    onMounted(() => {
      animeDetails();
      console.log(animeData);
    });

    async function animeDetails() {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          animeData.value = data.data[0].attributes;
        });
    }
    return {
      animeData,
    };
  },
  name: "animeBanner",
};
</script>
<style scoped>
.animeBanner {
  position: relative;
  overflow: hidden;
}
.animeBanner img {
  object-fit: cover;
  height: 60vh;
  object-position: center;
}
.animeInfo {
  position: absolute;
  padding: 12px 28px;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}
.animeInfo > p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; 
}
</style>
