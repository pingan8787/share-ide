<script lang="ts">
export default { name: 'EditorNestWidget' }
</script>
<script setup lang="ts">
import { ref, watch, reactive, onMounted } from "vue";
import componentStore from '@/store/component';
const componentStoreObj = componentStore();

const emit = defineEmits(['update:modelValue', 'updateCurComponent'])

let components = ref([]);

let props = defineProps<{
    modelValue?: any;
}>();

const setCurComponent = (data, index) => {
    emit('updateCurComponent', data)
}

watch(props.modelValue, (newVal, oldVal) => {
    components.value = newVal.slice();
})

watch(components.value, (newVal, oldVal) => {
    emit('update:modelValue', newVal);
})

const deleteComponent = (data, index: number) => {
    console.log('[删除]', data)
}

</script>

<template>
    <div class="EditorNestWidget">
        <draggable 
            :list="components"
            :sort="true"
            :animation="500"
            class="container"
            group="globalSchema"
            item-key="component"
            ghostClass="ghost"
            chosenClass="chosen"
        >
           
            <template #item="{element, index}">
                <div class="model-item">
                    <div class="model-remove model-handle-item" @click="() => deleteComponent(element, index)">
                        删除
                    </div>
                    <div class="model-component"
                        :class="componentStoreObj.isCurComponent(element.id) && 'active'"
                        @click="() => setCurComponent(element, index)"
                    >
                        <component :is="element.component" v-bind="element" />
                    </div>
                </div>
            </template>
        </draggable>

    </div>
</template>

<style lang="scss" scoped>
.EditorNestWidget {
    height: 100%;
    .container {
        min-height: 667px;;
    }
    .model-item {
        position: relative;
        border: 1px solid transparent;
        &.active {
            border: 1px solid $primary-color;
        }
        &:hover {
            border: 1px dotted $primary-color;
        }
        .model-handle-item {
            position: absolute;
            top: 0; /*no*/
            right: -87px;// TODO：可以改成动态计算
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px; /*no*/
            height: 24px; /*no*/
            font-size: 12px; /*no*/
            color: #333;
            background: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            cursor: pointer;

            &::after {
            content: "";
            position: absolute;
            right: 100%; /*no*/
            top: 7px; /*no*/
            width: 0; /*no*/
            height: 0; /*no*/
            border-width: 5px; /*no*/
            border-style: solid;
            border-color: transparent;
            margin-bottom: -1px; /*no*/
            border-right-width: 5px; /*no*/
            border-right-color: currentColor;
            color: #fff;
            }
        }
    }
}


// 拖动时在画布上的样式
.ghost {
  opacity: 0.4;
}
// 选中拖动的样式
.chosen {
//   color: #fff;
//   background-color: #c00;
}
</style>
