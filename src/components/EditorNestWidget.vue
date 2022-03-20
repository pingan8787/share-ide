<script lang="ts">
export default { name: 'EditorNestWidget' }
</script>
<script setup lang="ts">
import { ref, defineProps, watch, reactive } from "vue";

const emit = defineEmits(['update-cur-component'])

let curComponentIndex = ref(undefined);
let props = defineProps<{
    modelValue?: any;
    curComponent?: any;
}>();

const moveComponents = () => {
    curComponentIndex.value = undefined;
}

const setCurComponent = (data, index) => {
    emit('update-cur-component', data)
    curComponentIndex.value = index;
}
</script>

<template>
    <div class="EditorNestWidget">
        <draggable 
            :list="props.modelValue" 
            :animation="500"
            :sort="true"
            @change="moveComponents"
            group="exeEditor"
            item-key="component"
            ghostClass="ghost"
            chosenClass="chosen"
        >
            <template #item="{element, index}">
                <div
                    class="model-item"
                    :class="index === curComponentIndex && 'active'"
                    @click="() => setCurComponent(element, index)"
                >
                    <component :is="element.component" v-bind="element" />
                </div>
            </template>
        </draggable>

    </div>
</template>

<style lang="scss" scoped>
.EditorNestWidget {
    .model-item {
        border: 1px solid transparent;
        &.active {
            border: 1px solid var(--el-color-primary);
        }
        &:hover {
            border: 1px dotted var(--el-color-primary);
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
