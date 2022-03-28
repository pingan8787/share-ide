<script lang="ts">
export default { name: 'SchemaLink' }
</script>
<script setup lang="ts">
import { ref, reactive, onMounted, watch, getCurrentInstance } from "vue";
import type { AttrsValueItem } from '@/type/component';
import { CHANGE_CUR_COMPONENT } from '@/event/eventNames';
import SchemaLinkRemote from './remoteUrl.vue';
import DefaultOptions from './options';

const emit = defineEmits(['update:modelValue']);
let curOptions = reactive(DefaultOptions.options.options);
const { proxy } = getCurrentInstance();

/**
 * 选择链接，支持三种模式
    1.手动输入链接  -- input
    2.请求远程链接（固定接口） --- select
    3.请求远程链接（自定义接口） --- remote
 */

let curInputValue = ref(''); // 手动输入链接
let curSelect = ref(curOptions[0]); // 当前选中的对象
let curSelectValue = ref(curSelect.value['value']); // 请求远程链接（固定接口） 

let props = withDefaults(defineProps<{
    schema: AttrsValueItem;
    modelValue: string;
}>(), {
    modelValue: '',
})

onMounted(() => {
    console.log('[Schema Link]', props)
    curInputValue.value = props.modelValue;
    initOptions(); // 使用配置中的 options
    proxy.$eventBus.on(CHANGE_CUR_COMPONENT, function(data: any){
        console.log('[当前组件变化]',data)
        initValue();
    })
})

const initValue = () => {
    curInputValue.value = props.modelValue;
    curSelect.value = curOptions[0];
    curSelectValue.value = curSelect.value['value'];
}

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
    curInputValue.value = props.modelValue;
})

watch(curInputValue, (newVal, oldVal) => {
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

        <SchemaLinkRemote v-if="curSelectValue === 'remote'" :schema="props.schema" v-model="curInputValue"></SchemaLinkRemote>

        <config-item :label="curSelect.label">
            <div v-if="curSelectValue === 'input'">
                <el-input v-model="curInputValue" />
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
