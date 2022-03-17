<script setup>
import { ref } from 'vue';
import router from '@/router';

const toSchema = () => {
    router.push('/schema');
}
</script>

<template>
  <div class="HeaderContainer">
      <div class="text">动态分享可视化搭建平台</div>
      <div class="buttons">
          <el-button @click="toSchema">Schema 生成器</el-button>
      </div>
  </div>
</template>

<style lang="scss" scoped>
.HeaderContainer {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: #fff;
    box-shadow: 0 4px 6px 0 rgb(12 31 80 / 4%);
    box-sizing: border-box;
    .text {
    }
    .buttons {
    }
}
</style>
