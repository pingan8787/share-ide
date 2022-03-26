<script lang="ts">
export default { name: 'ExeSchemaTemplate' }
</script>
<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import type { ComponentSchemaList, SchemaValue, AttrsValueObject } from '@/type/component';

let props = defineProps<{
    schema: AttrsValueObject;
    modelValue: any;
}>();

const getComponent = (type: string = '') => 'Schema' + type.slice(0,1).toUpperCase() + type.slice(1);
const isValidChild = (child: any) => {
    if(!child) return false;
    const childList = Object.keys(child);
    return Array.isArray(childList) && childList.length > 0;
};

onMounted(() => {
    console.log('[props]', props)
})

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
