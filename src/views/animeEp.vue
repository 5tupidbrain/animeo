<template>
  <div class="container-md my-5">
    <div v-if="metaMedia">
      <div class="title m-4">
        <h4 class="display-5 font-weight-bold text-capitalize">
          {{ epList.name }}
        </h4>
        <small>Episode {{ epName.split("-").reverse()[0] }}</small>
      </div>

      <div class="epPlayer mx-auto my-5 container">
        <video
          controls
          playsinline
          preload="metadata"
          id="player"
          @keydown="toggleFullScreen(event)"
        >
          <source
            id="source"
            :src="`${metaMedia[0].ep_link}`"
            type="video/mp4"
          />
        </video>
        <div class="btndropdown py-2">
          <div class="dropdown p-2">
            <button
              class="btn btn-sm btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              speed {{ videoPlaybackRate }}
            </button>
            <ul
              class="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <button
                  v-on:click="playbackRate(0.75)"
                  class="dropdown-item"
                  type="button"
                >
                  0.75x
                </button>
              </li>
              <li>
                <button
                  v-on:click="playbackRate(1)"
                  class="dropdown-item"
                  type="button"
                >
                  1x
                </button>
              </li>
              <li>
                <button
                  v-on:click="playbackRate(1.25)"
                  class="dropdown-item"
                  type="button"
                >
                  1.25x
                </button>
              </li>
              <li>
                <button
                  v-on:click="playbackRate(1.5)"
                  class="dropdown-item"
                  type="button"
                >
                  1.50x
                </button>
              </li>
              <li>
                <button
                  v-on:click="playbackRate(2)"
                  class="dropdown-item"
                  type="button"
                >
                  2x
                </button>
              </li>
            </ul>
          </div>
          <div class="dropdown p-2">
            <button
              class="btn btn-sm btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ videoQuality }}
            </button>
            <ul
              class="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <button
                  v-on:click="changeSource('MD')"
                  class="dropdown-item"
                  type="button"
                >
                  360p
                </button>
              </li>
              <li>
                <button
                  v-on:click="changeSource('SD')"
                  class="dropdown-item"
                  type="button"
                >
                  480p
                </button>
              </li>
              <li>
                <button
                  v-on:click="changeSource('HD')"
                  class="dropdown-item"
                  type="button"
                >
                  720p
                </button>
              </li>
              <li>
                <button
                  v-on:click="changeSource('FHD')"
                  class="dropdown-item"
                  type="button"
                >
                  1080p
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="episodes_link m-4">
        <h5 class="text-left">Episodes</h5>
        <ul class="episode_list">
          <li v-for="(item, index) in epList.episode_id" :key="index">
            <router-link
              ref="link"
              v-on:click="pageReload()"
              :to="{
                name: 'animeEp',
                params: {
                  animeName: animeName,
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
    let animeName = window.location.href.split("/")[3];
    let epName = window.location.href.split("/")[4];
    let metaMedia = ref("");
    let epList = ref("");
    let url = "https://animeo-api.herokuapp.com/getEpisode/";
    let videoPlaybackRate = ref("1x");
    let videoQuality = ref("720p");

    onMounted(() => {
      episodeMedia(epName);
      episodeList(animeName);
    });

    async function episodeList(animeName) {
      let url = "https://animeo-api.herokuapp.com/getAnime/";
      await fetch(url + animeName)
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
    function pageReload() {
      location.reload();
    }

    function toggleFullScreen() {
      let video = document.getElementById("player");

      video.addEventListener("keydown", (e) => {
        if (e.key == "f" || e.key == "F") {
          if (document.fullscreen) {
            document.exitFullscreen();
          } else {
            video.requestFullscreen();
          }
        }
      });
    }

    function playbackRate(rate) {
      let video = document.getElementById("player");

      console.log(video.currentSrc);
      video.playbackRate = rate;
      videoPlaybackRate.value = video.playbackRate + "x";
    }

    function changeSource(mode) {
      let video = document.getElementById("player");

      if (mode == "MD") {
        video.src = metaMedia.value[1].ep_link;
        videoQuality.value='360p';
      } else if (mode == "SD") {
        video.src = metaMedia.value[2].ep_link;
        videoQuality.value='480p';
      } else if (mode == "HD") {
        video.src = metaMedia.value[3].ep_link;
        videoQuality.value='720p';
      } else if (mode == "FHD") {
        video.src = metaMedia.value[4].ep_link;
        videoQuality.value='1080p';
      }
    }

    return {
      episodeMedia,
      metaMedia,
      animeName,
      epName,
      pageReload,
      epList,
      episodeList,
      toggleFullScreen,
      playbackRate,
      videoPlaybackRate,
      videoQuality,
      changeSource,
    };
  },
};
</script>
<style scoped>
.dropdown {
  width: max-content;
  display: inline-block;
}
.dropdown-menu {
  min-width: 5rem;
}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.epPlayer video {
  border-radius: 4px;
  object-fit: cover;
  width: 100%;
}
.watch_more h4 {
  text-align: left;
}
.profile-card-2 img {
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
</style>
