<template>
  <!-- Navbar -->
  <nav class="navbar py-4 container-lg navbar-expand-lg navbar-dark bg-transparent">
    <!-- Container wrapper -->
    <div class="container-fluid main">
      <!-- Navbar brand -->
      <a class="py-2" href="/">Animeo</a>

      <input
        type="search"
        id="animeSearch"
        class=" animeSearch mx-auto"
        placeholder="Search Animes here"
        aria-label="Search"
      />
    </div>
  </nav>
  <!-- Navbar -->
</template>
<script>
import { onMounted } from "vue";
export default {
  setup() {
    onMounted(() => {
      document
        .getElementById("animeSearch")
        .addEventListener("keypress", function(event) {
          if (event.keyCode == 13) {
            Search();
          }
        });
    });
    function Search() {
      let input = document.getElementById("animeSearch").value;
      window.location.href = "/search/" + input;
    }
    return {
      Search,
    };
  },
  name: "navBar",
};
</script>

<style scoped>

.animeSearchForm {
  position: absolute;
  bottom: 0;
}
.main {
  position: relative !important;
}
.main a{
  font-size: 1.25rem;
  color: #fff;
}
.animeSearch {
  background-color: rgba(139, 139, 139, 0.124) !important;
  backdrop-filter: blur(18px);
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  color: #fff;
  position: absolute;
  transform: translate(-50%, 0);
  left: 50%;
  width: 100%;
  max-width: 520px;
}
.animeSearch:focus {
  border: none;
  outline: none;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #d1d1e4;
  opacity: 0.6  ;
  font-weight: 300;
}
@media screen and (max-width: 768px) {
  .animeSearch {
    position: static;
    transform: none;
    left: 0;
  }
  .navbar{
    padding: 12px 22px !important;
  }
  .main{
    display: flex;
    flex-direction: column;
  }
}
</style>
