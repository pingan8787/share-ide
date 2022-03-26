<script lang="ts">
export default { name: 'SchemaObject' }
</script>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";

let props = defineProps<{
    schema?: any;
}>();

</script>

<template>
    <div class="SchemaObject">
        <div class="object-container">
            <div class="label">
                <span>{{schema.label}}</span>
            </div>
            <div class="body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.SchemaObject {
    .label {
        padding: 10px 12px;
        background: #e8f0fb40;
        font-size: 14px;
        color: #323233;
        span {
            padding-left: 8px;
            border-left: 4px solid $primary-color;
        }
    }
}
</style>
