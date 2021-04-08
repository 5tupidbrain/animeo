<template>
  <div class=" col-sm-5 animeCard card" v-for="ane in anime" :key="ane.name">
    <router-link :to="{ name: 'animeDetails', params: { animeid: ane.title } }">
      <div class="animeInfo">
        <p class="wrapPara">{{ ane.synopsis.split(":")[1] }}</p>
        <div class="frontCard">
          <h2 class="wrapTxt">{{ ane.title }}</h2>
          <h2 class="releasedEp">
            {{ ane.released }}
            <span>· </span>
            <b v-if="ane.totalEpisodes">{{ ane.totalEpisodes }}</b>
            <b v-else>0</b>
            Episodes
          </h2>
          <ul class="genres">
            <li v-for="genre in ane.genres" :key="genre">{{ genre }}</li>
          </ul>
          <router-link
            :to="{ name: 'animeDetails', params: { animeid: ane.title } }"
            class="btn"
            >Watch now
          </router-link>
        </div>
      </div>
      <div>
        <img :src="`${ane.img}`" class="animePoster img-responsive" />
      </div>
      <div class="profile-name my-1 wrapTxt">
        <h2 class="animeTitle">{{ ane.title }}</h2>
        <h2 class="releasedEp">
          {{ ane.released }}
          <span>· </span>
          <b v-if="ane.totalEpisodes">{{ ane.totalEpisodes }}</b>
          <b v-else>0</b>
          Episodes
        </h2>
      </div>
    </router-link>
  </div>
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
::-webkit-scrollbar {
  display: none;
}
.animeCard {
  margin: 12px 0 20px;
  width: 100%;
  transition: ease-in 0.25s;
  display: block;
  padding: 0 !important;
  background: transparent !important;
  position: relative;
}
.animePoster {
  filter: brightness(80%);
  z-index: 22;
  object-fit: cover;
  z-index: 14;
  height: 260px;
  width: 100%;
  border-radius: 2px;
  display: block;
  background-attachment: fixed;
}

.profile-name h2{
  margin: 0 !important;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  text-transform: capitalize;
  letter-spacing: 0.7px;
  color: #fff;
  text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  transition: all ease-in-out 0.25s;
  text-align: left;
  z-index: 9999;
  width: 100%;
}
.animeTitle {
  padding: 12px 0px;
  padding-bottom: 8px;
}
.profile-name > .releasedEp{
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}
.animeInfo {
  position: absolute;
  opacity: 0;
  z-index: 99;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  height: 100%;
  width: 100%;
  padding: 18px;
}
.wrapPara {
  font-size: 12px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.wrapTxt {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.frontCard {
  background: #fff;
  position: absolute;
  transition: ease-in-out 0.25s;
  bottom: -16px;
  left: 0;
  height: 112px;
  width: 100%;
  text-align: left;
  border-radius: 12px;
  padding: 8px 12px;
  /* overflow: hidden; */
}
.genres {
  color: #000;
  width: 100%;
  list-style-type: none;
  margin: 0;
  margin-top: 6px;
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
.frontCard h2 {
  margin-bottom: 2px !important;
  font-weight: bold;
  font-size: 0.8rem;
  color: #000;
}
.releasedEp {
  font-size: 0.7rem !important;
}
.frontCard p {
  color: #000;
}
.frontCard a {
  box-shadow: 0 -6px 20px -8px rgb(141 139 142 / 49%);
  border-radius: 50px;
  padding: 12px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: -12px;
  cursor: pointer;
  background: #ff465f;
  transition: ease-in-out 0.28s;
  color: #fff;
}
.frontCard a:hover {
  box-shadow: 0 0px 12px 0px #f6546a;
  background: #f6546a;
  color: #fff;
}
.frontCard span {
  font-size: 16px;
  font-weight: bolder;
}
.animeCard:hover {
  transform: scale(1.05);
  border-radius: 12px;
}
.animeCard:hover .animeInfo {
  opacity: 1;
}
.animeCard:hover .frontCard {
  bottom: 0px;
}
.animeCard:hover .animePoster {
  border-radius: 13px;
}
</style>
