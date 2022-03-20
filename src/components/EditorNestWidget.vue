<script lang="ts">
export default { name: 'EditorNestWidget' }
</script>
<script setup lang="ts">
import { ref, defineProps, watch, reactive } from "vue";

const emit = defineEmits(['update-cur-component'])

let props = defineProps<{
    modelValue?: any;
    curComponent?: any;
}>();

watch(props.modelValue, (newVal, oldVal) => {
    console.log("[编辑区变化]", { oldVal, newVal });
});

const setCurComponent = data => {
    emit('update-cur-component', data)
}
</script>

<template>
    <div class="EditorNestWidget">
        <draggable 
            :list="props.modelValue" 
            group="exeEditor"
            animation="300"
            item-key="component"
        >
            <template #item="{element}">
                <div class="model-item" @click="() => setCurComponent(element)">
                    <component :is="element.component" v-bind="element" />
                </div>
            </template>
        </draggable>

    </div>
</template>

<style lang="scss" scoped>
.EditorNestWidget {
}
</style>
