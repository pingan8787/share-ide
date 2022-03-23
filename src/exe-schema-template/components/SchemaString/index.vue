<script lang="ts">
export default { name: 'SchemaString' }
</script>
<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from "vue";

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
    <div class="SchemaString">
        <config-item :label="props.schema.label">
            <el-input v-model="modelValue" :placeholder="props.schema.value" />
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaString {
}
</style>
