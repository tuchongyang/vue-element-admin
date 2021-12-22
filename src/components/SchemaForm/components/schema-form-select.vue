<template>
  <el-select v-model="modelValue" :mode="formItem.mode || ''" v-bind="formItem.props" v-on="formItem.eventObject" style="width: 100%">
    <template v-for="option in formItem.options" :key="option.value">
      <el-option :value="option.value" :label="option.label"></el-option>
    </template>
  </el-select>
</template>
<script>
import { defineComponent, computed } from "vue"
export default defineComponent({
  name: "SchemaFormSelect",
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
