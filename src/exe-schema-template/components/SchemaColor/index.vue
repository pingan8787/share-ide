<script lang="ts">
export default { name: 'SchemaColor' }
</script>
<script setup lang="ts">
import { ref, defineProps, onMounted, watch } from "vue";

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

</script>

<template>
    <div class="SchemaColor">
        <config-item :label="props.schema.label">
            <el-color-picker v-model="inputData" />
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaColor {
}
</style>
