<script>
export default { name: 'ExeKnowledge' }
</script>
<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>知识卡片</h1>
</template>

<style scoped>
</style>
