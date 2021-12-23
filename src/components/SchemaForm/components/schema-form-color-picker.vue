<template>
  <el-color-picker v-model="modelValue" show-alpha v-bind="formItem.props" v-on="formItem.eventObject"> </el-color-picker>
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
