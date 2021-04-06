<template>
  <navBar />
  <router-view />
  <bottomFooter></bottomFooter>
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
body {
  background-color: #001120 !important;
}

::-webkit-scrollbar {
  width: 6px;
  cursor: pointer;
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

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
</style>
