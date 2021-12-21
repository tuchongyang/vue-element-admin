<template>
  <el-form ref="schemaFormRef" :model="modelRef" :rules="rulesRef" v-bind="$attrs" style="display: flex; flex-wrap: wrap; position: relative; box-sizing: border-box">
    <template v-for="formItem in schemaItems" :key="formItem.field">
      <el-form-item :label="formItem.label" :prop="formItem.prop" :label-width="formItem.labelWidth" :style="{ maxWidth: (100 * formItem.span) / 24 + '%', flex: '0 0 ' + (100 * formItem.span) / 24 + '%' }">
        <component :is="getComponent(formItem.type)" v-model="modelRef[formItem.prop]" :form-item="formItem" />
      </el-form-item>
    </template>
    <template v-if="$slots['operate-button']">
      <el-form-item>
        <slot name="operate-button"></slot>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import { defineComponent, reactive, getCurrentInstance, isReactive, ref, isRef, createVNode, computed } from "vue"
import { isFunction, isAsyncFunction } from "@/utils/is"
import components from "./components"

export default defineComponent({
  name: "DynamicForm",
  components: {
    ...components,
  },
  props: {
    formSchema: {
      // 动态验证表单
      required: true,
      type: Object,
    },
    fields: {
      // 预置字段默认值
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    // a-form
    const schemaFormRef = ref()
    // 表单实例
    const formInstance = getCurrentInstance()

    // 表单项
    const modelRef = reactive(
      props.formSchema.formItem.reduce((previousValue, currentValue) => {
        currentValue.eventObject ??= {}
        previousValue[currentValue.prop] = currentValue.value || ""
        return previousValue
      }, {})
    )
    // 如果有默认值，则覆盖
    props.fields && Object.assign(modelRef, props.fields)
    // 异步设置默认数据
    props.formSchema.formItem.forEach(async (item) => {
      // 是否需要loading
      if (Object.prototype.hasOwnProperty.call(item, "loading")) {
        item.loading = true
      }
      // 异步选项
      if (isFunction(item.asyncOptions) || isAsyncFunction(item.asyncOptions)) {
        item.options = await item.asyncOptions(item, formInstance).finally(() => (item.loading = false))
      } else if (isFunction(item.asyncValue) || isAsyncFunction(item.asyncValue)) {
        // 异步默认值
        modelRef[item.field] = await item.asyncValue(item, formInstance).finally(() => (item.loading = false))
      }
    })

    const schemaItems = computed(() => {
      return props.formSchema.formItem.filter((item) => {
        if (!item.hidden) {
          return true
        }
        if (item.hidden instanceof Function) {
          return !item.hidden(modelRef)
        }
        return item.hidden
      })
    })

    // 生成表单验证规则
    const rulesRef = computed(() => {
      return (
        (props.formSchema.rules &&
          schemaItems.value.reduce((next, cur) => {
            next[cur.prop] = props.formSchema.rules[cur.prop]
            return next
          }, {})) ||
        {}
      )
    })

    const preset = ["input", "select", "radio", "checkbox", "input-number", "input-range", "switch", "file", "input-password", "date-picker"]

    // 获取组件名称
    const getComponent = (type) => {
      // 预设组件
      if (preset.includes(type)) {
        return "schema-form-" + type
      } else if (isReactive(type) || isRef(type)) {
        // 自定义组件
        return createVNode(type)
      } else {
        // 不识别组件
        return type
      }
    }
    const validate = (callback) => {
      return schemaFormRef.value.validate(callback)
    }

    return {
      modelRef,
      schemaFormRef,
      rulesRef,
      getComponent,
      schemaItems,
      validate,
    }
  },
})
</script>

<style lang="scss" scoped></style>
