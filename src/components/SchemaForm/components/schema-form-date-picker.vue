<template>
  <el-date-picker v-model="modelValue" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-bind="formItem.props" :disabled="formItem.disabled || false" :placeholder="(formItem.props && formItem.props.placeholder) || '请选择' + formItem.label" v-on="formItem.eventObject" style="width: 100%">
  </el-date-picker>
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
