import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login"

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: "/deal-index"
  },
  {
    path: '/deal-index',
    name: 'deal-index',
    component: () => import('../views/dealIndex.vue')
  },
  {
    path: '/single-detail',
    component: () => import('../views/singleDetail.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;