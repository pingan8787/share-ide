<script>
export default { name: 'Editor' }
</script>
<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
    <div class="EditorContainer">
        <div class="EditorModels">
            物料区
        </div>
        <div class="EditorCtrl">
            <div class="panel">
                <div class="panel-container">
                    编辑区
                </div>
            </div>
        </div>
        <div class="EditorConfig">
            配置区
        </div>
    </div>
</template>

<style scoped lang="scss">
.EditorContainer {
    display: flex;
    height: calc(100vh - 62px);
    .EditorModels {
        width: 230px;
        height: calc(100vh - 62px);
        padding: 10px 20px;
        background: #fff;
    }
    .EditorCtrl {
        display: flex;
        justify-content: center;
        flex: 1;
        height: 100%;
        overflow: auto;
        .panel {
            width: 100%;
            max-width: 900px;

            .panel-container {
                width: 375px;
                margin: 50px auto;
                background: #fff;
                box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1);
            }
        }
    }
    .EditorConfig {
        width: 360px;
        height: calc(100vh - 62px);
        overflow: auto;
        animation-duration: 0.2s;
        padding: 10px;
        background: #fff;
    }
}
</style>
