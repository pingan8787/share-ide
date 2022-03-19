<script lang="ts">
export default { name: 'Editor' }
</script>
<script setup lang="ts">
import { ref, onMounted, reactive, watch, computed } from "vue";
import _ from 'lodash';
import { getProperty } from "@/utils/global";
import { getRandomCode } from "@/utils/utils";

let exeSchema = reactive([]); // 物料区的数据
let exeEdit = reactive([]); // 编辑区的数据 最终导出的数据
let exeAttrs = ref({}); // 属性对象
let curComponent = ref({}); 
let curSchemaCollapse = ref(["1"]);

const hasCurComponent = computed(() => Object.keys(curComponent.value).length > 0);
const curSchema = computed(() => exeAttrs.value[curComponent.value.component]);

defineProps({
    msg: String,
});

onMounted(() => {
    const curSchema = getProperty("$exeSchema");
    const curAttrs = getProperty("$exeAttrs");
    exeSchema.push(...curSchema);
    exeAttrs.value = curAttrs;
    console.log('[exeSchema]', exeSchema)
    console.log('[exeAttrs]', exeAttrs.value)
});

watch(curComponent, (newVal, oldVal) => {
    console.log("[curComponent 变化]", { oldVal, newVal });
});

const changeSchemaCollapse = () => { };

const cloneSchema = (data) => {
    exeEdit.push({
        ..._.cloneDeep(data),
        id: getRandomCode(8)
    });
}

const changeSchema = (evt) => {
    console.log('[changeSchema]', evt)
}

const updateCurComponent = data => {
    curComponent.value = data;
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
                                    <!-- 图标组件 -->
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
                    <!-- <EditorNestWidget v-model:list="exeEdit" v-model="curComponent"></EditorNestWidget> -->
                    <EditorNestWidget v-model:list="exeEdit" @update-cur-component="updateCurComponent"></EditorNestWidget>
                </div>
            </div>
        </div>
        <div class="EditorConfig" v-if="hasCurComponent">
            <div class="editor-title">配置区</div>
            <ExeSchemaTemplate :schema="curSchema" v-model="curComponent"></ExeSchemaTemplate>
            <hr>
            <div>
                <b>当前组件数据：</b>
                <div>{{curComponent}}</div>
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
