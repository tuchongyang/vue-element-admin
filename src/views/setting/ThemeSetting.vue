<template>
  <PageHeader title="皮肤" desc="设置侧边栏、顶部以及全局主色调" />
  <el-card shadow="never">
    <curd-form ref="dynamicForm" :form-schema="formSchema"> </curd-form>
  </el-card>
</template>
<script setup>
import { computed } from "vue"
import PageHeader from "@/components/Layout/PageHeader"
import { useStore } from "vuex"
const store = useStore()
const sideTheme = computed(() => store.state.layout.sideTheme)
const headerTheme = computed(() => store.state.layout.headerTheme)
const sideBg = computed(() => store.state.layout.sideBg)
const layout = computed(() => store.state.layout.layout)
const headerBg = computed(() => store.state.layout.headerBg)
const tagViewType = computed(() => store.state.layout.tagViewType)
const formSchema = {
  formItem: [
    {
      prop: "sidebg",
      label: "侧边栏主题",
      type: "radio",
      options: [
        { label: "深色", value: "dark" },
        { label: "浅色", value: "light" },
      ],
      value: sideTheme.value,
      eventObject: {
        change: (val) => {
          store.commit("layout/setSideTheme", val)
          store.commit("layout/setSideBg", val == "light" ? "#fff" : "#191919")
        },
      },
    },
    {
      prop: "sidebgcolor",
      label: "侧边栏背景",
      type: "color-picker",
      value: sideBg.value,
      eventObject: {
        change: (val) => {
          store.commit("layout/setSideBg", val)
        },
      },
    },
    {
      prop: "headerbg",
      label: "头部栏主题",
      type: "radio",
      options: [
        { label: "深色", value: "dark" },
        { label: "浅色", value: "light" },
      ],
      value: headerTheme.value,
      eventObject: {
        change: (val) => {
          store.commit("layout/setHeaderTheme", val)
          store.commit("layout/setHeaderBg", val == "light" ? "#fff" : "#191919")
        },
      },
    },
    {
      prop: "headerbgcolor",
      label: "头部栏背景",
      type: "color-picker",
      value: headerBg.value,
      eventObject: {
        change: (val) => {
          store.commit("layout/setHeaderBg", val)
          // 头部和左侧需要联动
          if (layout.value == "top") {
            store.commit("layout/setSideBg", val)
          }
        },
      },
    },
    {
      prop: "primarycolor",
      label: "全局主色",
      type: "color-picker",
      value: "",
      eventObject: {
        change: (val) => {
          console.log(val)
          let dom = document.getElementById("primary-color")
          if (!dom) {
            dom = document.createElement("style")
            dom.setAttribute("id", "primary-color")
            document.head.appendChild(dom)
          }
          dom.innerHTML = val ? ":root{--el-color-primary: " + val + "}" : ""
        },
      },
    },
    {
      prop: "layout",
      label: "布局",
      type: "radio",
      options: [
        { label: "默认", value: "default" },
        { label: "分栏", value: "split" },
        { label: "纵向", value: "top" },
      ],
      value: layout.value,
      eventObject: {
        change: (val) => {
          store.commit("layout/setLayout", val)
          if (val == "top") {
            store.commit("layout/setHeaderTheme", "dark")
            store.commit("layout/setHeaderBg", sideBg.value)
          } else {
            store.commit("layout/setHeaderTheme", "light")
            store.commit("layout/setHeaderBg", "#fff")
          }
        },
      },
    },
    {
      prop: "tagViewType",
      label: "标签风格",
      type: "radio",
      options: [
        { label: "标签", value: "tab" },
        { label: "卡片", value: "card" },
      ],
      value: tagViewType.value,
      eventObject: {
        change: (val) => {
          store.commit("layout/setTagViewType", val)
        },
      },
    },
  ],
  labelWidth: 110,
}
</script>
