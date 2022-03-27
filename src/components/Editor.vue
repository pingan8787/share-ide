<script lang="ts">
export default { name: 'Editor' }
</script>
<script setup lang="ts">
import { ref, onMounted, reactive, watch, computed, provide } from "vue";
import _ from 'lodash';
import type { ComponentSchemaList, ComponentAttrs, ComponentSchema } from '@/type/component';
import { getProperty } from "@/utils/global";
import { getRandomCode } from "@/utils/utils";
import componentStore from '@/store/component';
const componentStoreObj = componentStore();

let globalSchema = reactive<ComponentSchemaList>([]); // 物料区的数据
let editData = ref([]); // 编辑区的数据 最终导出的数据
let globalAttrs = ref<ComponentAttrs>({}); // 属性对象
let curComponent = ref<ComponentSchema>({
    component: '',
    icon: '',
    name: '',
});
let curSchemaCollapse = ref<string[]>(["1"]);

const hasCurComponent = computed(() => Object.keys(componentStoreObj.curComponent).length > 0);
const curSchema = computed(() => {
    const { component = '' } = curComponent.value;
    return component ? globalAttrs.value[component] : reactive({});
});

onMounted(() => {
    globalSchema.push(...getProperty("$GlobalSchema"));
    globalAttrs.value = getProperty("$GlobalAttrs");
});

watch(curComponent, (newVal, oldVal) => {
    componentStoreObj.curComponent = newVal;
})

watch(editData, (newVal, oldVal) => {
    componentStoreObj.editData = newVal;
});

const cloneSchema = (data: ComponentSchema) => ({
    ..._.cloneDeep(data),
    id: getRandomCode(8)
})

const closeConfigModel = () => {
    componentStoreObj.showCurComponent = false;
};

const updateCurComponent = (data: ComponentSchema) => {
    curComponent.value = data;
}

</script>

<template>
    <div class="EditorContainer">
        <div class="EditorSchema">
            <div class="editor-title">
                <div class="left">物料区</div>
                <div class="right">
                    <el-icon>
                        <arrow-left />
                    </el-icon>
                </div>
            </div>
            <el-collapse v-model="curSchemaCollapse">
                <el-collapse-item title="通用物料" name="1">
                    <draggable
                        :list="globalSchema"
                        :group="{ name: 'globalSchema', pull: 'clone', put: false }"
                        :clone="cloneSchema"
                        :animation="300"
                        :sort="false"
                        class="container"
                        ghostClass="ghost"
                        chosenClass="chosen"
                        item-key="component"
                    >
                        <template #item="{ element }">
                            <div class="model-item">
                                <div class="icon">
                                    <component :is="element.icon" />
                                </div>
                                <div class="title">{{ element.name }}</div>
                            </div>
                        </template>
                    </draggable>
                </el-collapse-item>
                <el-collapse-item title="基础物料" name="2">开发中...</el-collapse-item>
                <el-collapse-item title="更多物料" name="3">开发中...</el-collapse-item>
            </el-collapse>
        </div>
        <div class="EditorCtrl">
            <div class="panel">
                <div class="panel-container">
                    <div class="panel-header">
                        <div class="item active">编辑模式</div>
                        <div class="item">预览模式</div>
                    </div>
                    <EditorNestWidget v-model="editData" @updateCurComponent="updateCurComponent"></EditorNestWidget>
                </div>
            </div>
        </div>
        <div class="EditorConfig" v-if="componentStoreObj.showCurComponent">
            <div class="editor-title">
                <div class="left">配置区</div>
                <div class="right" @click="closeConfigModel">
                    <el-icon><close /></el-icon>
                </div>
            </div>
            <div class="config-id">当前物料ID：{{ curComponent.id }}</div>
            <ExeSchemaTemplate :schema="curSchema" v-model="curComponent"></ExeSchemaTemplate>
            <hr />
            <div class="edit-code">
                <b>当前组件模型：</b>
                <!-- <div>{{ curSchema }}</div> -->
                <highlightjs language='json' :code="JSON.stringify(curSchema)" />
                <b>当前组件数据：</b>
                <highlightjs language='json' :code="JSON.stringify(curComponent)" />
            </div>
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
        border-left: 4px solid $primary-color;
        border-radius: 4px;
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right {
            display: flex;
            align-items: center;
            cursor: pointer;
        }
    }
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
            background: $primary-color;
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
            position: relative;
            .panel-header {
                position: absolute;
                top: -34px;
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: center;
                .item {
                    cursor: pointer;
                    padding: 4px 8px;
                    font-size: 14px;
                    background-color: #fff;
                    border: 1px solid #dcdee0;
                    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
                    &.active {
                        color: $primary-color;
                        border-color: $primary-color;
                        background-color: $primary-bg-color;
                    }
                }
            }
        }
    }
}
.EditorConfig {
    width: 380px;
    height: calc(100vh - 62px);
    overflow: auto;
    animation-duration: 0.2s;
    padding: 10px;
    background: #fff;
    .config-id {
        padding: 10px;
        color: #969799;
        font-size: 14px;
    }
    .edit-code {
        pre {
            white-space: pre-wrap!important;
            word-wrap: break-word!important;
        }
    }
}
// 拖动时在画布上的样式
.ghost {
    opacity: 0.4;
}
// 选中拖动的样式
.chosen {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    box-sizing: border-box;
    .title {
        font-size: 12px;
    }
    .icon {
        width: 26px;
    }
    background-color: #969799;
}
</style>
