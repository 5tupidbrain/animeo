<template>
  <!-- Navbar -->
  <nav class="navbar">
    <div class="container-fluid main px-md-5">
      <!-- Navbar brand -->

      <div class="navItems">
        <div class="menu">
          <a class="py-2 title" href="/">Animeo</a>
          <a href="#" class="icon" v-on:click="myFunction()">&#9776;</a>
        </div>
        <div class="navLinks" id="navLinks">
          <div class="responsiveNav">
            <router-link :to="{ name: 'movies' }" class="moviesLink">
              Movies
            </router-link>
            <div class="dropdown">
              <a class="dropbtn">
                Genres <img src="../assets/downsolid.svg" alt="" srcset="" />
              </a>
              <div class="dropdown-content">
                <router-link
                  :to="{ name: 'genrePage', params: { genreName: genre } }"
                  v-for="genre in genresList"
                  :key="genre"
                >
                  {{ genre }}
                </router-link>
              </div>
            </div>
          </div>
          <input
            type="search"
            id="animeSearch"
            class=" animeSearch"
            placeholder="Search Animes here"
            :value="SearchVal"
            aria-label="Search"
          />
          <!-- <router-link :to="{ name: 'genrePage' }">
            Alphabets
          </router-link> -->
        </div>
      </div>
    </div>
  </nav>
  <!-- Navbar -->
</template>
<script>
import { onMounted } from "vue";
export default {
  setup() {
    let genresList = [
      "Action",
      "Adventure",
      "Cars",
      "Comedy",
      "Dementia",
      "Demons",
      "Drama",
      "Dub",
      "Ecchi",
      "Fantasy",
      "Game",
      "Harem",
      "Hentai",
      "Historical",
      "Horror",
      "Josei",
      "Kids",
      "Magic",
      "Martial Arts",
      "Mecha",
      "Military",
      "Music",
      "Mystery",
      "Parody",
      "Police",
      "Psychological",
      "Romance",
      "Samurai",
      "School",
      "Sci-Fi",
      "Seinen",
      "Shoujo",
      "Shoujo Ai",
      "Shounen",
      "Shounen Ai",
      "Slice of Life",
      "Space",
      "Sports",
      "Super Power",
      "Supernatural",
      "Thriller",
      "Vampire",
      "Yaoi",
      "Yuri",
    ];
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

    function myFunction() {
      var x = document.getElementById("navLinks");
      if (x.classList.contains("active")) {
        x.classList.remove("active");
      } else {
        x.classList.add("active");
      }
      console.log(x.style.display === "none");
    }

    function Search() {
      let input = document.getElementById("animeSearch").value;
      window.sessionStorage.setItem("searchValue", input);
      window.location.href = "/search/" + input;
    }
    return {
      Search,
      SearchVal,
      genresList,
      myFunction,
    };
  },
  name: "navBar",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap");
.navbar {
  background: var(--secondary);
  margin: 0 !important;
  max-width: 100%;
  padding-bottom: 0 !important;
}
.animeSearchForm {
  position: absolute;
  bottom: 0;
}
.main {
  position: relative !important;
  display: flex;
  justify-content: space-between;
  z-index: 999;
}
.title {
  text-transform: uppercase;
  font-family: "Oswald", sans-serif;
}
.main a {
  font-size: 1.25rem;
  color: #fff;
}

.navItems,
.responsiveNav {
  display: flex;
  align-items: center;
  gap: 28px;
  width: max-content;
}
.navItems {
  min-width: 100%;
  position: relative;
}
.responsiveNav {
  gap: 0;
}
.navLinks {
  min-width: max-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0;
}
.navLinks a {
  font-size: 12px;
  font-family: "Open Sans", sans-serif;
}
.moviesLink {
  font-size: 14px !important;
  padding: 16px 0;
  font-weight: 600;
}
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon {
  display: none;
}
.dropbtn {
  background-color: transparent;
  color: rgba(255, 255, 255, 0.7);
  padding: 16px;
  font-size: 14px !important;
  font-weight: 600;
  transition: ease 0.1s;
  border: none;
}
.dropbtn img {
  height: 12px;
  opacity: 0.7;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  margin-top: 12px;
  border-radius: 12px;
  display: none;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  padding: 12px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  text-align: left;
}

.dropdown-content a {
  padding: 4px 16px;
  color: var(--primary);
  text-decoration: none;
  width: max-content;
  display: block;
  transition: ease 0.3s;
  font-weight: bold;
}

.dropdown-content a:hover {
  color: var(--primary);
  opacity: 0.7;
}

.dropdown:hover .dropdown-content {
  display: grid;
}

.dropdown:hover .dropbtn {
  color: #fff;
}

.animeSearch {
  background-color: rgba(139, 139, 139, 0.124) !important;
  backdrop-filter: blur(18px);
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  color: #fff;
  width: 100%;
  max-width: 280px;
  font-size: 14px;
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
.active {
  display: flex !important;
}
@media screen and (max-width: 610px) {
  .icon {
    display: block;
  }
  .main {
    padding: 0 !important;
    margin: 0 !important;
  }
  .navbar {
    padding: 12px 0 !important;
    margin: 0 !important;
  }
  .dropbtn,
  .moviesLink,
  .responsiveNav {
    padding: 6px !important;
    width: 100% !important;
  }
  .animeSearch {
    margin-left: auto;
    margin-right: auto;
  }
  .navItems {
    flex-direction: column;
    justify-content: space-between;
    gap: 0;
    width: 100%;
  }
  .menu {
    width: 100%;
    padding: 0 1rem;
  }
  .navLinks {
    width: 100%;
    display: none;
    flex-direction: column;
  }
  .responsiveNav {
    flex-direction: column;
  }
  .dropdown {
    min-width: 100%;
    padding: 6px !important;
  }
  .dropdown-content {
    left: 0;
    right: 0;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (max-width: 1024px) {
  .main {
    padding: 0 1rem;
  }
}
</style>
