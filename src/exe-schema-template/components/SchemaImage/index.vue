<script lang="ts">
export default { name: 'SchemaImage' }
</script>
<script setup lang="ts">
import { ref, defineProps, onMounted, reactive } from "vue";

let props = defineProps<{
    schema?: any;
}>();

onMounted(() => {
    console.log('[SchemaImage]', props.schema)
});

</script>

<template>
    <div class="SchemaImage">
        <config-item :label="props.schema.label">
            <img class="image" :src="props.schema.value" alt="">
        </config-item>
    </div>
</template>

<style lang="scss" scoped>
.SchemaImage {
    .image {
        max-width: 120px;
        max-height: 120px;
    }
}
</style>
