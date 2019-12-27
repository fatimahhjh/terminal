import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [{
    path: '/',
    redirect: "/terminal-index"
  },
  {
    path: '/terminal-index',
    name: 'terminal-index',
    component: () => import('../views/terminalIndex.vue')
  },
  // {
  //   path: '/single-detail',
  //   component: () => import('../views/singleDetail.vue')
  // }



];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;