<script lang="ts">
export default { name: 'ExeSchemaTemplate' }
</script>
<script setup lang="ts">
import { ref, defineProps, onMounted, reactive, watch } from "vue";

let props = defineProps<{
    schema?: any;
    modelValue?: any;
}>();

onMounted(() => {
    console.log('[ExeSchemaTemplate]', props)
});

watch(props.schema, (newVal, oldVal) => {
    console.log("[schema 变化]", { oldVal, newVal });
});

const getComponent = (type: string = '') => 'Schema' + type.slice(0,1).toUpperCase() + type.slice(1);

</script>

<template>
    <div class="ExeSchemaTemplate">
        <div v-for="(item, key, index) in props.schema" :key="index">
            <component
                :is="getComponent(item.type)"
                :schema="item"
                v-model="modelValue[key]"
            ></component>
        </div>
        <!-- <config-item :label="label">
                :key="index"
                :schema="item"
                v-bind="item"
                v-model="value[key]"
            字符串组件
        </config-item> -->
    </div>
</template>

<style lang="scss" scoped>
.ExeSchemaTemplate {
}
</style>
