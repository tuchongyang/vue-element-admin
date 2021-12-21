<template>
  <el-input v-model="modelValue" :disabled="formItem.disabled || false" v-bind="formItem.props" :placeholder="(formItem.props && formItem.props.placeholder) || '请输入' + formItem.label" autocomplete="new-password" v-on="formItem.eventObject" />
</template>
<script>
import { defineComponent, computed } from "vue"

export default defineComponent({
  name: "SchemaFormInput",
  components: {},
  props: {
    formItem: {
      // 表单项
      type: Object,
      default: () => ({}),
    },
    value: undefined, // 表单项值
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit("update:value", val),
    })

    return {
      modelValue,
    }
  },
})
</script>
