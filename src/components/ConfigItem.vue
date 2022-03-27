<script lang="ts">
export default { name: 'ConfigItem' }
</script>
<script setup lang="ts">
import { ref, watch, reactive } from "vue";

let props = defineProps<{
    label: string;
    info?: any;
}>();

</script>

<template>
    <div class="ConfigItem">
        <div class="content">
            <div class="label">{{props.label}}</div>
            <div class="main"><slot></slot></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ConfigItem {
    .content {
        display: flex;
        align-items: center;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        .label {
            color: $main-text-color;
            font-size: 14px;
            width: 100px;
        }
        .main {
            flex: 1;
            width: calc(100% - 70px);
        }
    }
}
</style>
