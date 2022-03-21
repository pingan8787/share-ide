<script lang="ts">
export default { name: 'SchemaNumber' }
</script>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { compileScript } from "vue/compiler-sfc";

let inputData = ref(0);

const emit = defineEmits(['update:modelValue'])

let props = withDefaults(defineProps<{
    schema?: any;
    modelValue?: any;
}>(), {
    modelValue: 0,
})

onMounted(() => {
    console.log('[SchemaNumber]', props)
    inputData.value = props.modelValue || 0;
});

watch(inputData, (newVal, oldVal) => {
    console.log('[inputData]', newVal, oldVal)
    emit('update:modelValue', newVal)
})

</script>

<template>
    <div class="SchemaNumber">
        <config-item :label="props.schema.label">
            <el-slider v-model="inputData" :placeholder="props.schema.value" />
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaNumber {
}
</style>
