<template>
  <li class="profile-card-2 col-sm-5 animeCard card" v-for="ane in anime" :key="ane.name">
    <router-link
      :to="{ name: 'animeDetails', params: { animeid: ane.anime_id } }"
    >
      <div class="img">
        <img :src="`${ane.img_url}`" class="img img-responsive" />
      </div>
      <div class="profile-name my-1">{{ ane.name }}</div>
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
.glass-bg {
  background-color: rgba(0, 0, 0, 0.124);
  backdrop-filter: blur(18px);
  width: 100%;
  height: 60px;
  bottom: 0;
  position: absolute;
  border-radius: 0px 0px 5px 5px;
  z-index: 1;
}

.animeBanner {
  object-fit: cover;
}

.img_shadow {
  position: absolute;
  left: 50%;
  transform: translate(-50%) !important;
  top: 20px;
  z-index: -1;
  filter: brightness(50%) blur(20px);
  margin: auto auto;
  width: 85%;
}
.img_shadow img {
  width: 100%;
  height: auto;
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

.img img {
  filter: brightness(80%);
  object-fit: cover;
  z-index: 14;
  max-height: 320px;
  height: auto;
  width: 100%;
  border-radius: 5px;
  display: block;
  transition: all linear 0.25s;
  background-attachment: fixed;
}

.profile-card-2 .profile-name {
  padding: 12px 4px;
  margin: 0 !important;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: #fff;
  text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  font-family: "Oswald", sans-serif;
  transition: all linear 0.25s;
  text-align: left;
  overflow: hidden;
  z-index: 9999;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.profile-card-2:hover .img img {
  filter: brightness(40%);
  background: #121212;
}
@media screen and (max-width: 768px) {
  .animeCard{
    max-width: 180px;
  }
  .img img {
    max-height: 250px;
  }
}
@media screen and (max-width: 540px) {
  .animeCard{
    max-width: 140px;
  }
  .img img {
    max-height: 200px;
  }
}
</style>
