<script lang="ts">
export default { name: 'SchemaLink' }
</script>
<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from "vue";
import type { AttrsValueItem } from '@/type/component';
import DefaultOptions from './options';

const emit = defineEmits(['update:modelValue']);
let curOptions = reactive(DefaultOptions.options.options);

let curValue = ref('');
let curSelect = ref(curOptions[0]); // 当前选中的对象
let curSelectValue = ref(curSelect.value['value']); // 当前选中对象的值

let props = withDefaults(defineProps<{
    schema: AttrsValueItem;
    modelValue: string;
}>(), {
    modelValue: '',
})

onMounted(() => {
    console.log('[Schema Link]', props)
    curValue.value = props.modelValue;
    initOptions(); // 使用配置中的 options
})

const initOptions = () => {
    const { options } = props.schema;
    if(options){
        // 初始化 options 配置
        if(options.options){
            curOptions.length = 0;
            curOptions.push(...options.options);
            curSelect.value = curOptions[0];
            curSelectValue.value = curOptions[0]['value'];
        }
    }
}

watch(props, (newVal, oldVal) => {
    curValue.value = props.modelValue;
})

watch(curValue, (newVal, oldVal) => {
    emit('update:modelValue', newVal)
})

watch(curSelectValue, (newVal, oldVal) => {
    curOptions.forEach(item => {
        if(item.value === newVal){
            curSelect.value = item;
        }
    })
})


</script>

<template>
    <div class="SchemaLink">
        <config-item :label="props.schema.label">
            <el-select v-model="curSelectValue">
                <el-option
                    v-for="item in curOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </config-item>

        <config-item :label="curSelect.label">
            <div v-if="curSelectValue === 'input'">
                <el-input v-model="curValue" />
            </div>
            <div v-if="curSelectValue === 'select'">
                <div v-if="!props.schema.options.originUrl" class="common-text">请在组件中配置 "originUrl" 字段！</div>
                <div v-else>
                    <el-select v-model="curSelectValue">
                        <!-- <el-option
                            v-for="item in curOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        /> -->
                    </el-select>
                </div>
            </div>
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaLink {
    .common-text {
        color: $main-text-color;
        font-size: 14px;
    }
}
</style>
