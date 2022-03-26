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

</script>

<template>
    <div class="EditorNestWidget">
        <draggable 
            :list="components"
            :sort="true"
            :animation="500"
            class="container"
            group="exeSchema"
            item-key="component"
            ghostClass="ghost"
            chosenClass="chosen"
        >
           
            <template #item="{element, index}">
                <div
                    class="model-item"
                    :class="componentStoreObj.isCurComponent(element.id) && 'active'"
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
    height: 100%;
    .container {
        min-height: 667px;;
    }
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
