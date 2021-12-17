import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/Layout/BasicLayout"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/HomeView"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
