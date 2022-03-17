<script setup>
import { ref, onMounted, reactive } from "vue";
import { getProperty } from "@/utils/global";

let exeSchema = reactive([]);
let exeEdit = reactive([]);
let curSchemaCollapse = ref(["1"]);

defineProps({
    msg: String,
});

onMounted(() => {
    const curSchema = getProperty("$exeSchema");
    exeSchema.push(...curSchema);
    console.log('[curSchema]', curSchema)
});

const changeSchemaCollapse = () => { };

const cloneSchema = (data) => {
    console.log('[cloneSchema]', data)
    exeEdit.push(data);
}

const changeSchema = (evt) => {
    console.log('[changeSchema]', evt)
}
</script>

<template>
    <div class="EditorContainer">
        <div class="EditorSchema">
            <div class="editor-title">物料区</div>
            <el-collapse v-model="curSchemaCollapse" @change="changeSchemaCollapse">
                <el-collapse-item title="默认物料" name="1">
                    <draggable 
                        :list="exeSchema" 
                        :group="{ name: 'exeSchema', pull: 'clone', put: false }"
                        :clone="cloneSchema"
                        :sort="false"
                        @change="changeSchema"
                        animation="300"
                        item-key="component"
                    >
                        <template #item="{element}">
                            <div class="model-item">
                                <div class="icon">
                                    <component :is="element.icon" />
                                </div>
                                <div class="title">{{ element.name }}</div>
                            </div>
                        </template>
                    </draggable>
                </el-collapse-item>
                <el-collapse-item title="更多物料" name="2">开发中...</el-collapse-item>
            </el-collapse>
        </div>
        <div class="EditorCtrl">
            <div class="panel">
                <div class="panel-container">
                    <draggable 
                        :list="exeEdit" 
                        :group="{ name: 'exeSchema', pull: 'clone', put: false }"
                        animation="300"
                        item-key="component"
                    >
                        <template #item="{element}">
                            <div class="model-item">
                                <div class="icon">
                                    <component :is="element.icon" />
                                </div>
                                <div class="title">{{ element.name }}</div>
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
        <div class="EditorConfig">
            <div class="editor-title">配置区</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.EditorContainer {
    display: flex;
    height: calc(100vh - 62px);
    .editor-title {
        font-size: 18px;
        padding-left: 8px;
        border-left: 4px solid var(--el-color-primary);
        border-radius: 4px;
        margin-bottom: 8px;
    }
    .EditorSchema {
        width: 220px;
        height: calc(100vh - 62px);
        padding: 10px 20px;
        background: #fff;

        .model-item {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            width: 100px;
            padding: 16px 0;
            font-size: 12px;
            color: #666;
            cursor: pointer;

            .icon {
                margin-bottom: 10px;
                width: 30px;
                height: 30px;
            }

            &:hover {
                color: #fff !important;
                background: var(--el-color-primary);
                .canvas-left-item-type {
                    color: #fff;
                }
            }
        }
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
                min-height: 667px;
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
