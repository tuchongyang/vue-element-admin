<template>
  <el-dialog v-model="visible" v-bind="$attrs" title="Tips" width="60%" :before-close="remove">
    <schema-form ref="dynamicForm" :fields="fields" :form-schema="dynamicValidateForm" :label-width="formSchema.labelWidth || '110px'" style="margin-right: 40px" v-loading="confirmLoading" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="remove" :disabled="confirmLoading">取消</el-button>
        <el-button type="primary" @click="onOk" :disabled="confirmLoading">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue"
import { SchemaForm } from "@/components/SchemaForm"
import { ElDialog } from "element-plus"
export default defineComponent({
  name: "OperateModal",
  components: { SchemaForm, ElDialog },
  props: {
    remove: {
      // 移除模态框
      type: Function,
    },
    formSchema: {
      // 表单项
      type: Object,
      default: () => ({}),
    },
    fields: {
      // 默认值，一般编辑时传入
      type: Object,
      default: () => ({}),
    },
    hiddenFields: {
      // 不需要显示的字段（表单项）
      type: Array,
      default: () => [],
    },
    handleOk: {
      // 点击确定
      type: Function,
    },
  },
  setup(props) {
    const dynamicForm = ref()

    const state = reactive({
      visible: true,
      confirmLoading: false,
      // dynamicValidateForm: cloneDeep(props.formSchema)
      dynamicValidateForm: props.formSchema,
    })

    props.hiddenFields.forEach((field) => {
      const d = state.dynamicValidateForm.formItem.find((item) => item.field == field)
      d && (d.hidden = !!props.fields)
    })

    const onOk = () => {
      state.confirmLoading = true
      dynamicForm.value
        ?.validate()
        .then(async () => {
          const pass = await (props.handleOk && props.handleOk(dynamicForm.value?.modelRef, state)).finally(() => (state.confirmLoading = false))
          if (typeof pass == "undefined" || pass) {
            state.visible = false
          }
        })
        .catch(() => {
          state.confirmLoading = false
        })
    }

    return {
      ...toRefs(state),
      onOk,
      dynamicForm,
    }
  },
})
</script>

<style scoped></style>
