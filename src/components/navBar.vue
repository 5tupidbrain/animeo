<template>
  <!-- Navbar -->
  <nav
    class="navbar py-4 container-lg navbar-expand-lg navbar-dark "
  >
    <!-- Container wrapper -->
    <div class="container-fluid main px-sm-5">
      <!-- Navbar brand -->
      <a class="py-2 title" href="/">Animeo</a>

      <input
        type="search"
        id="animeSearch"
        class=" animeSearch mx-auto"
        placeholder="Search Animes here"
        :value="SearchVal"
        aria-label="Search"
      />

      <div class="social">
        <a href="https://www.instagram.com/5tupidbrain/"
          ><img class="m-2" src="../assets/insta.svg" alt=""
        /></a>
      </div>
    </div>
  </nav>
  <!-- Navbar -->
</template>
<script>
import { onMounted } from "vue";
export default {
  setup() {
    let SearchVal = sessionStorage.getItem("searchValue");
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
      window.sessionStorage.setItem("searchValue", input);
      window.location.href = "/search/" + input;
    }
    return {
      Search,
      SearchVal,
    };
  },
  name: "navBar",
};
</script>

<style scoped>
.navbar{
  background: var(--secondary);
  margin: 0 !important;
  max-width: 100%;
}
.animeSearchForm {
  position: absolute;
  bottom: 0;
}
.main {
  position: relative !important;
}
.title{
  text-transform: uppercase;
  font-family: "Oswald", sans-serif;

}
.main a {
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
  opacity: 0.6;
  font-weight: 300;
}
.social img {
  height: 28px;
  filter: invert(1) brightness(50%);
}
@media screen and (max-width: 768px) {
  .animeSearch {
    max-width: 380px;
  }
}
@media screen and (max-width: 568px) {
  .animeSearch {
    position: static;
    transform: none;
    left: 0;
  }
  .navbar {
    padding: 12px 22px !important;
  }
  .main {
    display: flex;
    flex-direction: column;
  }
}
</style>
