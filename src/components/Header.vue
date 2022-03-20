<script lang="ts">
export default { name: 'Header' }
</script>
<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import LOGO from '@/assets/logo.png';
import schemaStore from '@/store/schema';

const schemaStoreObj = schemaStore();

const toSchema = () => {
    router.push('/schema');
}

const toPreview = () => {
    console.log('[最终生成的数据]', schemaStoreObj.editData)
}
</script>

<template>
  <div class="HeaderContainer">
      <div class="text"><img class="logo" :src="LOGO" /> 动态分享可视化搭建平台</div>
      <div class="buttons">
          <el-button @click="toSchema">Schema 生成器</el-button>
          <el-button @click="toPreview">预览页面</el-button>
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
    .logo {
        width: 32px;
        height: 32px;
        margin-right: 8px;
    }
    .text {
        display: flex;
        align-items: center;
    }
    .buttons {
    }
}
</style>
