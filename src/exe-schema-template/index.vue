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
    console.log('[初始化属性编辑区数据]', props)
});

watch(props.modelValue, (newVal, oldVal) => {
    console.log("[modelValue 变化]", { oldVal, newVal });
});

const getComponent = (type: string = '') => 'Schema' + type.slice(0,1).toUpperCase() + type.slice(1);
const isValidChild = (child: any) => {
    if(!child) return false;
    const childList = Object.keys(child);
    return Array.isArray(childList) && childList.length > 0;
};

</script>

<template>
    <div class="ExeSchemaTemplate">
        <div v-for="(item, key, index) in props.schema" :key="index">
            <component
                :is="getComponent(item.type)"
                :schema="item"
                v-bind="item"
                v-model="modelValue[key]"
            >
                <ExeSchemaTemplate
                    v-if="isValidChild(item.child)"
                    :schema="item.child"
                    v-model="modelValue[key]"
                ></ExeSchemaTemplate>
            </component>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ExeSchemaTemplate {
}
</style>
