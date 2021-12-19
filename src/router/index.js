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
        meta: { title: "主页", icon: "House" },
        component: () => import("@/views/HomeView"),
      },
      {
        path: "/table",
        name: "table",
        component: () => import("@/components/Layout/EmptyLayout"),
        children: [
          {
            path: "customTable",
            name: "customTable",
            component: () => import("@/views/table/CustomTable"),
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
