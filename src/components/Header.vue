<script lang="ts">
export default { name: 'Header' }
</script>
<script setup lang="ts">
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import router from '@/router';
import LOGO from '@/assets/logo.png';
import componentStore from '@/store/component';

const componentStoreObj = componentStore();

const toSchema = () => {
    router.push('/schema');
}

const toPreview = () => {
  ElMessageBox.alert(componentStoreObj.editData, '最终预览的数据', {
    confirmButtonText: 'OK',
    callback: (action) => {
      ElMessage({
        type: 'info',
        message: '渲染成功~',
      })
    },
  })
}
</script>

<template>
  <div class="HeaderContainer">
      <div class="text"><img class="logo" :src="LOGO" /> 动态分享可视化搭建平台</div>
      <div class="buttons">
          <el-button @click="toSchema"><el-icon class="header-icon"><monitor /></el-icon>Schema 生成器</el-button>
          <el-button @click="toPreview"><el-icon class="header-icon"><iphone /></el-icon>预览页面</el-button>
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
        .header-icon {
            margin-right: 6px;
        }
    }
}
</style>
