<template>
  <footer class="footer py-2 ">
    <div class="container text-left">
      <img src="../assets/logo.png" alt="">
        <h5>Animeo &copy; 2021 </h5>
        <p class="MWL">Made with <span>❤</span> in India.</p>
    </div>
  </footer>
</template>
<script>
export default {
  name: "bottomFooter",
};
</script>
<style scoped>
footer{
  background: var(--secondary);
  border-top-left-radius: 12px;
}
img{
  height: 64px;
}
.MWL {
  position: static;
  font-size: 12px;
  filter: brightness(60%);
}
</style>
