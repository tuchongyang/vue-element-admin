// create-api.ts
import { createVNode, render } from "vue"
import FormModal from "./form-modal.vue"

let _app

/**
 * 创建表单模态框
 * @param modalOptions
 * @param formOptions
 */
export const useFormModal = (options) => {
  // 组件实例
  let formModal
  const container = document.createElement("div")
  // 移除组件
  const remove = () => {
    formModal = null
    render(null, container)
    container.remove()
  }
  formModal = createVNode(FormModal, { ...options, remove })
  // 使当前模态框继承App实例上下文
  _app && (formModal.appContext = _app._instance?.appContext)
  render(formModal, container)
  document.body.appendChild(container)
  return formModal
}

// 暴露一个插件 API
const install = (app) => {
  _app = app
}
export default install
