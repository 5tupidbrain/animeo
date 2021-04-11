<template>
  <div class="baseContainer">
    <div class="loader" id="loader">
      <div class="div">
        <img src="./assets/Ghost.gif" alt="" srcset="" />
        <h4>Loading,<br />Please wait!</h4>
        <p class="MWL">Animeo - Made with <span>❤</span> in India.</p>
      </div>
    </div>
    <div id="baseData">
      <navBar />
      <router-view />
      <bottomFooter></bottomFooter>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar.vue";
import bottomFooter from "./components/footer.vue";

export default {
  components: {
    navBar,
    bottomFooter,
  },
};
</script>

<style>
:root {
  --background: #001120;
  --primary: #f6546a;
  --secondary: #021929;
  --greybg: #4e4e50;
}
body {
  background-color: var(--background) !important;
}
.baseContainer {
  position: relative;
}
#baseData {
  display: none;
}
::-webkit-scrollbar {
  width: 6px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #072f52;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #3788cf;
  border-radius: 50px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #195d99;
}

.loader {
  position: fixed;
  z-index: 999;
  background: #001120;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader img {
  height: 80px !important;
}
.loader h4 {
  margin-top: 12px;
  font-size: 16px;
  font-weight: normal;
  text-align: center !important;
}
.MWL {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  font-size: 12px;
  filter: brightness(60%);
}
.MWL span {
  color: red;
}
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
</style>
