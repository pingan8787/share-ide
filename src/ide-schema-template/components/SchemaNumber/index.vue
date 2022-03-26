<script lang="ts">
export default { name: 'SchemaNumber' }
</script>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import type { AttrsValueItem } from '@/type/component';
import DefaultOptions from './options';

const emit = defineEmits(['update:modelValue']);

let curValue = ref(0);
let curOptions = ref(DefaultOptions.options);

let props = withDefaults(defineProps<{
    schema: AttrsValueItem;
    modelValue: number;
}>(), {
    modelValue: 0,
})

const update = () => {
    curValue.value = props.modelValue;
    if(props.schema.options){
        curOptions.value = {...curOptions.value, ...props.schema.options}
    }
}

watch(props, update);

onMounted(update);

watch(curValue, (newVal, oldVal) => {
    emit('update:modelValue', newVal)
})

</script>

<template>
    <div class="SchemaNumber">
        <config-item :label="props.schema.label">
            <el-slider v-model="curValue" v-bind="curOptions" />
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaNumber {
}
</style>
