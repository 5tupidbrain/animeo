<template>
  <div class="container mainDiv m-5 mx-auto">
    <div v-if="metaMedia">
      <div class="title m-2">
        <h4 id="animeName" class="font-weight-bold text-capitalize">
          {{ epList.title }}
        </h4>
      </div>

      <div class="videoContainer">
        <div class="epPlayer my-2 mx-2">
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
            <div class="nextEp py-2">
              <button
                id="prevBtn"
                class=" btn btn-sm btn-outline-primary text-light "
                v-on:click="changeEp('P')"
              >
                Prev Ep
              </button>
            </div>
            <div class="btnControls">
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
                      v-on:click="playbackRate(1.75)"
                      class="dropdown-item"
                      type="button"
                    >
                      1.75x
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
            <div class="nextEp py-2">
              <button
                id="nextBtn"
                class=" btn btn-sm btn-outline-primary text-light "
                v-on:click="changeEp('N')"
              >
                Next Ep
              </button>
            </div>
          </div>
        </div>
        <div class="mx-auto toastHeader">
          <p class="toastHeader-item">
            If changing video quality not working, complete the captcha
            <a :href="`${metaMedia[1].ep_link}`">here!</a> (One time only)
          </p>
        </div>
        <div class="episodes_link mx-2 my-2">
          <!-- <h5 class="text-left">Episodes</h5> -->
          <ul id="EpList" class="episode_list">
            <li v-for="(item, index) in epList.episodes" :key="index">
              <router-link
                ref="link"
                v-on:click="pageReload()"
                :to="{
                  name: 'animeEp',
                  params: {
                    animeName: animeName,
                    animeEpisode: item.id,
                  },
                }"
                class="epItem"
              >
                Ep {{ index + 1 }}
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
    let animeName = window.location.href.split("/")[3];
    let epName = window.location.href.split("/")[4];
    let metaMedia = ref("");
    let epList = ref("");
    let url = "https://animeo-api.vercel.app/api/v1/AnimeEpisodeHandler/";
    let videoPlaybackRate = ref("1x");
    let videoQuality = ref("720p");

    onMounted(() => {
      Loading()
      episodeMedia(epName);
      episodeList(animeName);
    });

    function Loading() {
      document.getElementById("baseData").style.display = "none";
      document.getElementById("loader").style.display = "flex";
    }
    function isLoaded() {
      document.getElementById("loader").style.display = "none";
      document.getElementById("baseData").style.display = "block";
    }
    let currentEp = () => {
      let Eplist = document.getElementById("EpList");
      let Idx = window.location.href
        .split("/")
        .pop()
        .split("-")
        .pop();
      Eplist.children.forEach((ele) => {
        if (ele.children[0].innerText.split(" ").pop() === Idx) {
          ele.children[0].classList.add("active");
          console.log("found");
        }
      });
    };

    function changeTitle() {
      document.title =
        "Ep " +
        epName.split("-").reverse()[0] +
        " - " +
        epList.value.title +
        " | Animeo";
    }
    function changeEp(type) {
      if (type === "P") {
        let pageNo = parseInt(
          window.location.pathname
            .split("/")[2]
            .split("-")
            .reverse()[0]
        );
        if (pageNo > 1) {
          let loc =
            "/" +
            window.location.pathname.split("/")[1] +
            "/" +
            window.location.pathname.split("/")[2].replace(pageNo, pageNo - 1);
          window.location.assign(loc);
        } else {
          document.getElementById("prevBtn").disabled = true;
        }
      } else {
        let pageNo = parseInt(
          window.location.pathname
            .split("/")[2]
            .split("-")
            .reverse()[0]
        );
        if (pageNo < epList.value.totalEpisodes) {
          let loc =
            "/" +
            window.location.pathname.split("/")[1] +
            "/" +
            window.location.pathname.split("/")[2].replace(pageNo, pageNo + 1);
          window.location.assign(loc);
        } else {
          document.getElementById("nextBtn").disabled = true;
        }
      }
    }
    async function episodeList(animeName) {
      let url = "https://animeo-api.vercel.app/api/v1/Search/";
      await fetch(url + animeName)
        .then((response) => response.json())
        .then((data) => {
          isLoaded()
            epList.value = data.search[0];
          changeTitle();
          setTimeout(() => {
            currentEp();
          }, 1000);
        });
    }

    async function episodeMedia(epName) {
      await fetch(url + epName)
        .then((response) => response.json())
        .then((data) => {
          metaMedia.value = data.anime;
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
      let source = document.getElementById("source");
      if (mode == "MD") {
        source.setAttribute("src", metaMedia.value[1].ep_link);
        videoQuality.value = "360p";
        video.load();
        video.play();
      } else if (mode == "SD") {
        source.setAttribute("src", metaMedia.value[2].ep_link);
        videoQuality.value = "480p";
        video.load();
        video.play();
      } else if (mode == "HD") {
        source.setAttribute("src", metaMedia.value[3].ep_link);
        videoQuality.value = "720p";
        video.load();
        video.play();
      } else if (mode == "FHD") {
        source.setAttribute("src", metaMedia.value[4].ep_link);
        videoQuality.value = "1080p";
        video.load();
        video.play();
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
      changeEp,
      currentEp,
    };
  },
};
</script>
<style scoped>
*{
  scrollbar-width: 0;
}

.active {
  background: #1266f1 !important;
}
.dropdown {
  width: max-content;
  display: inline-block;
}
.dropdown-menu {
  min-width: 5rem;
}
.title {
  text-align: left;
}
.title h4 {
  margin: 0;
}
.videoContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
}
.epPlayer {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.epPlayer video {
  border-radius: 4px;
  object-fit: cover;
  width: 100%;
}
.btndropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.episodes_link {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  text-align: center;
}
.episode_list {
  height: 320px;
  flex-wrap: nowrap;
  overflow-y: scroll;
  list-style: none;
  padding: 0 6px;
}
.episode_list::-webkit-scrollbar {
  display: none;
}
.episode_list li {
  display: inline-block;
}
.epItem {
  width: 98px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.04);
  display: inline-block;
  font-size: 14px;
  margin: 2px;
  display: inline-block;
  border-radius: 4px;
  text-decoration: none;
  color: white;
}
.epItem:hover{
  background: rgba(255, 255, 255, 0.2);
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
.toastHeader {
  margin-bottom: 12px;
  max-width: 900px;
  padding: 8px 16px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
}
.toastHeader p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin: 0;
}

@media screen and (max-width: 1200px) {
  .videoContainer {
    flex-direction: column !important;
  }
  .episode_list {
    flex-direction: row;
    justify-content: center;
    flex-flow: wrap;
  }
}
</style>
