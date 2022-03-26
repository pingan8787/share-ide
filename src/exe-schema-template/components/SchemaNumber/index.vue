<script lang="ts">
export default { name: 'SchemaNumber' }
</script>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const emit = defineEmits(['update:modelValue']);

let curValue = ref(0);

let props = withDefaults(defineProps<{
    schema?: any;
    modelValue?: any;
}>(), {
    modelValue: 0,
})

watch(props, (newVal, oldVal) => {
    curValue.value = props.modelValue;
})

onMounted(() => {
    curValue.value = props.modelValue;
})

watch(curValue, (newVal, oldVal) => {
    emit('update:modelValue', newVal)
})

</script>

<template>
    <div class="SchemaNumber">
        <config-item :label="props.schema.label">
            <el-slider v-model="curValue" :placeholder="props.schema.value" />
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaNumber {
}
</style>
