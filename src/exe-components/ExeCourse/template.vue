<script>
export default { name: 'ExeCourse' }
</script>
<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>课程卡片</h1>
</template>

<style scoped>
</style>
