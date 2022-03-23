<script lang="ts">
export default { name: 'SchemaColor' }
</script>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const emit = defineEmits(['update:modelValue'])

let props = defineProps<{
    schema?: any;
    modelValue?: any;
}>();

watch(props, (newVal, oldVal) => {
    emit('update:modelValue', newVal.modelValue)
})

</script>

<template>
    <div class="SchemaColor">
        <config-item :label="props.schema.label">
            <el-color-picker v-model="modelValue" />
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaColor {
}
</style>
