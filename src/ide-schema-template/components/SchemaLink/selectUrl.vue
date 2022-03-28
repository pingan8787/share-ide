<script lang="ts">
export default { name: "SchemaLinkSelect" };
</script>
<script setup lang="ts">
import { ref, reactive, onMounted, watch, getCurrentInstance } from "vue";
import type { AttrsValueItem } from "@/type/component";
import DefaultOptions from "./options";

const emit = defineEmits(["update:modelValue"]);

let curInputValue = ref(""); // 最终结果
// let curSelect = ref(curOptions[0]); // 当前选中的对象
// let curSelectValue = ref(curSelect.value['value']); // 请求远程链接（固定接口）

let props = withDefaults(
    defineProps<{
        schema: AttrsValueItem;
        modelValue: string;
    }>(),
    {
        modelValue: "",
    }
);

onMounted(() => {
    console.log("[SchemaLinkSelect Link]", props);
    curInputValue.value = props.modelValue;
});

watch(props, (newVal, oldVal) => {
    curInputValue.value = props.modelValue;
});

watch(curInputValue, (newVal, oldVal) => {
    emit("update:modelValue", newVal);
});
</script>

<template>
    <div class="SchemaLinkSelect">
        <config-item label="选择链接">
            <div v-if="!props.schema.options.originUrl" class="common-text">请在组件中配置 "originUrl" 字段！</div>
            <div v-else>
                <el-select v-model="curSelectValue">
                    <!-- <el-option
                            v-for="item in curOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    />-->
                </el-select>
            </div>
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaLinkSelect {
    .common-text {
        color: $main-text-color;
        font-size: 14px;
    }
}
</style>
