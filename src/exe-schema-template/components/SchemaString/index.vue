<script lang="ts">
export default { name: 'SchemaString' }
</script>
<script setup lang="ts">
import { ref, defineProps, onMounted, reactive } from "vue";

let props = defineProps<{
    schema?: any;
}>();

onMounted(() => {
    console.log('[SchemaString]', props.schema)
});


</script>

<template>
    <div class="SchemaString">
        <config-item :label="props.schema.label">
            <!-- <el-input v-model="input" placeholder="Please input" size='small' /> -->
            <el-input v-model="props.schema.value" placeholder="Please input" />
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaString {
}
</style>
