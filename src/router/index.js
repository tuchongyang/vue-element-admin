import { createRouter, createWebHistory } from "vue-router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const routes = [
  {
    path: "/redirect",
    component: () => import("@/components/Layout/BasicLayout"),
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/RedirectView"),
      },
    ],
  },
  {
    path: "/",
    name: "Dashboard",
    meta: { title: "主页", icon: "House" },
    component: () => import("@/components/Layout/BasicLayout"),
    children: [
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        hidden: true,
      },
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        hidden: true,
      },
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
          {
            path: "customMenu",
            name: "customMenu",
            meta: { title: "自定义操作" },
            component: () => import("@/views/table/CustomMenu"),
          },
          {
            path: "customMenuLeft",
            name: "customMenuLeft",
            meta: { title: "自定义按钮" },
            component: () => import("@/views/table/CustomMenuLeft"),
          },
          {
            path: "customHeader",
            name: "customHeader",
            meta: { title: "自定义表头" },
            component: () => import("@/views/table/CustomHeader"),
          },
          {
            path: "uploadImage",
            name: "uploadImage",
            meta: { title: "图片上传与显示" },
            component: () => import("@/views/table/UploadImage"),
          },
        ],
      },
      {
        path: "/form",
        name: "form",
        meta: { title: "表单", icon: "Document" },
        component: () => import("@/components/Layout/EmptyLayout"),
        children: [
          {
            path: "customForm",
            name: "customForm",
            meta: { title: "基础表单" },
            component: () => import("@/views/form/CustomForm"),
          },
        ],
      },
      // 404 page must be placed at the end !!!
      // using pathMatch install of "*" in vue-router 4.0
      { path: "/:pathMatch(.*)", redirect: "/404", hidden: true },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
