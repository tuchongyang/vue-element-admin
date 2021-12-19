import * as components from "../components"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import * as Icons from "./icons"
export default (app) => {
  app.use(ElementPlus)
  console.log("components", components)
  // 装载components组件
  for (const i in components) {
    const item = components[i]
    const name = item.name || i
    app.component(name, item)
  }
  // 装载Icon图标
  for (const i in Icons) {
    const item = Icons[i]
    const name = i
    app.component(name, item)
  }
}
