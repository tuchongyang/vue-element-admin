<template>
  <el-checkbox-group v-model="model" style="width: 100%" v-on="formItem.eventObject">
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
    modelValue: undefined, // 表单项值
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val),
    })

    return {
      model,
    }
  },
})
</script>
