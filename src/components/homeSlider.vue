<template>
  <div class="container my-5">
    <div
      v-for="item in newSeason.slice(0, 1)"
      :key="item"
      class="d-flex flex-row"
    >
      <img class="banner_img d-block" :src="`${item.img_url}`"/>
      <div class="">
        <h5>{{ item.name }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    let newSeason = ref("");

    onMounted(() => {
      newMeta();
      console.log(newSeason);
    });

    async function newMeta() {
      let req = "/NewSeasons/1";
      let url = "http://localhost:3000" + req;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          newSeason.value = data;
        });
    }

    return {
      newMeta,
      newSeason,
    };
  },
  name: "homeSlider",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner_img{
    height: 420px;
    border-radius: 4px;
}
</style>
