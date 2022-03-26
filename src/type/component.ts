/**
    exeSchema
[
    //...
    {
        component: "ExeArticle",
        cover: "http://110.42.184.128:8090/img/1638499959273.jpg",
        desc: "这是一段文章简介文章简介文章简介这是一段文章简介文章简介文章简介这是一段文章简介文章简介文章简介",
        icon: "document",
        name: "文章卡片",
        styles: {
            imgBorder: "#eee",
            imgHeight: 60,
            imgRadius: 6,
            imgWidth: 100
        }
        title: "这是一段文章标题",
    }
]

    exeAttrs
    {
        //...
        ExeArticle: {
            cover: {
                label: "封面图片",
                type: "image",
                value: "http://110.42.184.128:8090/img/1638499959273.jpg",
            },
            desc: {
                label: "文章简介"
                type: "string"
                value: "这是
            }

        }

    }
 */

import { type } from "os";

export type ComponentSchemaList = ComponentSchema[];

export type ComponentSchema = {
    component: string;
    icon: string;
    name: string;
    [key: string]: SchemaValue;
}

export type SchemaValue = string | number | {[key: string]: any};


export type ComponentAttrs = {[key: string]: AttrsValue}

export type AttrsValue = {[key: string]: AttrsValueObject};

export type AttrsValueObject = {[item: string]: AttrsValueItem};

export type AttrsValueItem = {
    label: string;
    type: string;
    value: any;
    child?: any;
    options?: any;
}
