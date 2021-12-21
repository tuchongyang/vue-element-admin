<template>
  <el-checkbox-group v-model="modelValue" style="width: 100%" v-on="formItem.eventObject">
    <el-row>
      <template v-for="option in formItem.options" :key="option.value">
        <el-col :span="8">
          <el-checkbox :value="option.value">
            {{ option.label }}
          </el-checkbox>
        </el-col>
      </template>
    </el-row>
  </el-checkbox-group>
</template>
<script>
import { defineComponent, computed } from "vue"

export default defineComponent({
  name: "SchemaFormCheckbox",
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
