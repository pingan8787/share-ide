<script lang="ts">
export default { name: 'SchemaString' }
</script>
<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, computed } from "vue";

const emit = defineEmits(['update:modelValue']);

let curValue = ref('');

let props = withDefaults(defineProps<{
    schema?: any;
    modelValue?: any;
}>(), {
    modelValue: '',
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
    <div class="SchemaString">
        <config-item :label="props.schema.label">
            <el-input v-model="curValue" :placeholder="props.schema.value" />
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaString {
}
</style>
