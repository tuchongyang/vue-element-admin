<template>
  <el-upload v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" :action="uploadUrl" :before-upload="beforeUpload" :headers="headers" @change="handleChange">
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <Loading v-if="loading"></Loading>
      <Plus v-else></Plus>
      <!-- <div class="ant-upload-text">上传</div> -->
    </div>
  </el-upload>
</template>
<script>
import { defineComponent, computed, ref } from "vue"
import { Plus, Loading } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"

export default defineComponent({
  name: "SchemaFormFile",
  components: { Plus, Loading },
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

    const fileList = ref([])
    const loading = ref(false)
    const imageUrl = ref("")
    const uploadUrl = "/api/file/upload"
    const headers = { authorization: localStorage.getItem("token") }
    const handleChange = (info) => {
      if (info.file.status === "uploading") {
        loading.value = true
        return
      }
      if (info.file.status === "done") {
        if (info.file.response && info.file.response.status == 200) {
          // Get this url from response in real world.
          // getBase64(info.file.originFileObj, (base64Url) => {
          imageUrl.value = info.file.response.result.url
          loading.value = false
          // })
          modelValue.value = imageUrl.value
        }
      }
      if (info.file.status === "error") {
        loading.value = false
        ElMessage.error("upload error")
      }
    }

    const beforeUpload = (file) => {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
      if (!isJpgOrPng) {
        ElMessage.error("You can only upload JPG file!")
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        ElMessage.error("Image must smaller than 2MB!")
      }
      return isJpgOrPng && isLt2M
    }

    return {
      modelValue,
      fileList,
      loading,
      imageUrl,
      uploadUrl,
      handleChange,
      beforeUpload,
      headers,
    }
  },
})
</script>
<style scoped>
.avatar-uploader img {
  max-width: 100%;
}
</style>
