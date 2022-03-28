<script lang="ts">
export default { name: 'SchemaLinkRemote' }
</script>
<script setup lang="ts">
import { ref, reactive, onMounted, watch, getCurrentInstance } from "vue";
import { ElMessage } from 'element-plus';
import type { AttrsValueItem } from '@/type/component';
import DefaultOptions from './options';

const emit = defineEmits(['update:modelValue']);
let curOptions = reactive(DefaultOptions.options.options);
const { proxy } = getCurrentInstance();

let curInputValue = ref(''); // 最终结果
let curRemoteUrl = ref(''); // 请求远程链接（自定义接口）
let curRemoteDataPath = ref(''); // 请求远程链接（自定义接口）取值路径
let loadingRemoteData = ref(false); // 远程数据加载状态

let props = withDefaults(defineProps<{
    schema: AttrsValueItem;
    modelValue: string;
}>(), {
    modelValue: '',
})

onMounted(() => {
    console.log('[SchemaLinkRemote Link]', props)
    curInputValue.value = props.modelValue;
})


watch(props, (newVal, oldVal) => {
    curInputValue.value = props.modelValue;
})

watch(curInputValue, (newVal, oldVal) => {
    emit('update:modelValue', newVal)
})

const postRemoteRequest = async () => {
    if(!curRemoteUrl.value) {
        ElMessage({
            message: '请输入远程地址！',
            type: 'error',
        })
        return;
    };
    if(!curRemoteDataPath.value){
        ElMessage({
            message: '请输入取值路径！',
            type: 'error',
        })
        return;
    }
    loadingRemoteData.value = true;
    try {
        const result = await proxy.$api.get(curRemoteUrl.value);
        handleModelValue(result.data);
    } catch (error) {
        ElMessage({
            message: '远程数据请求失败，请检查接口！',
            type: 'error',
        })
    } finally {
        loadingRemoteData.value = false;
    }
}

const handleModelValue = (data: any) => {
    console.log('[请求结果]', data, curRemoteDataPath.value);
    const params = curRemoteDataPath.value.split('.');
    let result: any;
    params.forEach(key => {
        result = (result && result[key]) || data[key];
    })
    if(result){
        curInputValue.value = result;
        ElMessage({
            message: '远程数据请求成功，设置完成~',
            type: 'success',
        })
    }
}

</script>

<template>
    <div class="SchemaLinkRemote">
        <config-item label="接口地址">
            <el-input v-model="curRemoteUrl" placeholder="请输入远程接口地址"/>
        </config-item>
        <config-item label="取值路径">
            <el-input v-model="curRemoteDataPath" placeholder="响应数据的取值路径，如data.url"/>
        </config-item>
        <config-item label="">
            <el-button @click="postRemoteRequest" type="primary" :loading="loadingRemoteData">请求数据</el-button>
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaLinkRemote {
    .common-text {
        color: $main-text-color;
        font-size: 14px;
    }
}
</style>
