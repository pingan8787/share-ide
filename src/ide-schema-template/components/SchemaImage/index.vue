<script lang="ts">
export default { name: 'SchemaImage' }
</script>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";

let props = defineProps<{
    schema?: any;
}>();

</script>

<template>
    <div class="SchemaImage">
        <config-item :label="props.schema.label">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
            >
                <img v-if="props.schema.value" :src="props.schema.value" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
    border-color: $primary-color;
}
.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
