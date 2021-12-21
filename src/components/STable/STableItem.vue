<template>
  <ConstantStatus :value="props.scope.row[props.schema.prop]" v-if="props.schema.options" :options="props.schema.options" />
  <span v-else>{{ props.scope.row[props.schema.prop] }}</span>
</template>
<script setup>
import { defineProps } from "vue"
const props = defineProps({
  scope: {
    type: Object,
    default() {
      return {}
    },
  },
  schema: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>
