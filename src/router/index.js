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
        meta: { title: "表格", icon: "Grid" },
        component: () => import("@/components/Layout/EmptyLayout"),
        children: [
          {
            path: "customTable",
            name: "customTable",
            meta: { title: "基础表格" },
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
