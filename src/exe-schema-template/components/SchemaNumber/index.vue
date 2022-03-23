<script lang="ts">
export default { name: 'SchemaNumber' }
</script>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const emit = defineEmits(['update:modelValue'])

let props = withDefaults(defineProps<{
    schema?: any;
    modelValue?: any;
}>(), {
    modelValue: 0,
})

watch(props, (newVal, oldVal) => {
    emit('update:modelValue', newVal.modelValue)
})

</script>

<template>
    <div class="SchemaNumber">
        <config-item :label="props.schema.label">
            <el-slider v-model="modelValue" :placeholder="props.schema.value" />
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaNumber {
}
</style>
