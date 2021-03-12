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

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
</style>
