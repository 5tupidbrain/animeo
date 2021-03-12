import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
// import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/search/:query',
    name: 'searchPage',
    props: true,
    component: () => import('../views/searchAnime.vue')
  },
  {
    path: '/:animeName/:animeEpisode',
    name: 'animeEp',
    props: true,
    component: () => import('../views/animeEp.vue')
  },
  {
    path: '/anime/:animeid',
    name: 'animeDetails',
    props: true,
    component: () => import('../views/animeDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
