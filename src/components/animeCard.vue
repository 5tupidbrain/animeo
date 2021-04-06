<template>
  <li
    class="profile-card-2 col-sm-5 animeCard card"
    v-for="ane in anime"
    :key="ane.name"
  >
    <router-link
      :to="{ name: 'animeDetails', params: { animeid: ane.title } }"
    >
      <div class="img">
        <img :src="`${ane.img}`" class="img img-responsive" />
      </div>
      <div class="profile-name my-1">{{ ane.title }}</div>
    </router-link>
    <!-- 
    <div class="img_shadow">
      <img :src="`${anime.img_url}`" class="img img-responsive" />
    </div> -->
  </li>
</template>

<script>
export default {
  name: "animeCard",
  props: {
    anime: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600&display=swap");

.animeCard {
  margin: 2px;
  width: 100%;
  max-width: 240px;
  padding: 0 !important;
  background: transparent !important;
  position: relative;
  overflow: visible !important;
}
.anime {
  position: absolute;
  bottom: 0px;
  display: block;
  width: 100%;
}

.animeBanner {
  object-fit: cover;
}

.profile-card-2 {
  background-position: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  margin: 12px;
  border-radius: 4px !important;
}
.img {
  z-index: 22;
}

.img  img {
  filter: brightness(80%);
  object-fit: cover;
  z-index: 14;
  height: 320px;
  width: 100%;
  border-radius: 2px;
  display: block;
  transition: all ease-in-out 0.25s;
  background-attachment: fixed;
}

.profile-card-2 .profile-name {
  padding: 12px 0px;
  margin: 0 !important;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  text-transform: capitalize;
  letter-spacing: 0.7px;
  color: #fff;
  text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  font-family: "Oswald", sans-serif;
  transition: all ease-in-out 0.25s;
  text-align: left;
  overflow: hidden;
  z-index: 9999;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.profile-card-2:hover .img img {
  outline: solid 3px #fff;
  background: #121212;
}
@media screen and (max-width: 768px) {
  .animeCard {
    width: 180px;
  }
}
@media screen and (max-width: 540px) {
  .animeCard {
    width: 140px;
    min-width: 140px;
  }
  .img img {
    height: 200px;
    width: 140px;
  }
}
</style>
