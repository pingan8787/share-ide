<script lang="ts">
export default { name: 'ArticleComponent' }
</script>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";

let props = defineProps<{
    title?: string;
    desc?: string;
    cover?: string;
    styles?: any;
    link?: string;
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
    <div class="ArticleComponent">
        <div class="container img-left">
            <div class="img">
                <img :src="props.cover" :style="getImgStyle()" />
            </div>
            <div class="info">
                <div class="title">{{ props.title }}</div>
                <div class="desc">{{ props.desc }}</div>
            </div>
        </div>
        <div class="target-url">跳转地址：{{ props.link }}</div>
    </div>
</template>

<style scoped lang="scss">
.ArticleComponent {
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
                @include show-line;
            }
            .desc {
                margin-top: 6px;
                font-size: 12px;
                @include show-line;
            }
        }
    }
    .target-url {
        position: absolute;
        top: 0;
        right: 0;
        background: rgba($color: $primary-color, $alpha: 0.6);
        font-size: 12px;
        color: #fff;
        padding: 4px;
    }
}
</style>
