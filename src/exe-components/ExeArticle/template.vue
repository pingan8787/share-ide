<script lang="ts">
export default { name: 'ExeArticle' }
</script>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";

let props = defineProps<{
    title?: any;
    desc?: any;
    cover?: any;
    styles?: any;
}>();

const getImgStyle = () => {
    return {
        border: '2px solid ' + props.styles.imgBorder,
        width: props.styles.imgWidth + "px",
        height: props.styles.imgHeight + "px",
        borderRadius: props.styles.imgRadius + "px",
    };
}
</script>

<template>
    <div class="ExeArticle">
        <div class="container img-left">
            <div class="img">
                <img :src="props.cover" :style="getImgStyle()" />
            </div>
            <div class="info">
                <div class="title">{{ props.title }}</div>
                <div class="desc">{{ props.desc }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.ExeArticle {
    padding: 12px;
    .img-left {
        flex-direction: row;
        .info {
            padding-left: 12px;
        }
    }
    .img-right {
        flex-direction: row-reverse;
        .info {
            padding-right: 12px;
        }
    }
    .container {
        display: flex;
        padding: 12px;
        border: 1px solid #eee;
        border-radius: 6px;
        .img {
            img {
                width: 100%;
                height: 100%;
            }
        }
        .info {
            flex: 1;
            .title {
                font-size: 16px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .desc {
                margin-top: 6px;
                font-size: 12px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
    }
}
</style>
