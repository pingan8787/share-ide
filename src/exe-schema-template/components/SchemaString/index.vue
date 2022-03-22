<script lang="ts">
export default { name: 'SchemaString' }
</script>
<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from "vue";

let inputData = ref('');

const emit = defineEmits(['update:modelValue'])

let props = defineProps<{
    schema?: any;
    modelValue?: any;
}>();

onMounted(() => {
    inputData.value = props.modelValue;
});

watch(inputData, (newVal, oldVal) => {
    emit('update:modelValue', newVal)
})

onBeforeUnmount(() => {
    console.log('[onBeforeUnmount]')
})

</script>

<template>
    <div class="SchemaString">
        <config-item :label="props.schema.label">
            <el-input v-model="inputData" :placeholder="props.schema.value" />
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaString {
}
</style>
