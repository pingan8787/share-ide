<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
    <div class="IndexPage">
        <div class="header">
            <Header></Header>
        </div>
        <div class="container">
            <Editor></Editor>
        </div>
    </div>
</template>

<style scoped>
.header {
    height: 60px;
    line-height: 60px;
}
.IndexPage {
    background-color: #f7f8fa;
}
</style>
