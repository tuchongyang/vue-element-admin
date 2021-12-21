<template>
  <el-radio-group v-model="modelValue" v-on="formItem.eventObject">
    <template v-for="option in formItem.options" :key="option.value">
      <el-radio :label="option.value">
        {{ option.label }}
      </el-radio>
    </template>
  </el-radio-group>
</template>
<script>
import { defineComponent, computed } from "vue"

export default defineComponent({
  name: "SchemaFormRadio",
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
