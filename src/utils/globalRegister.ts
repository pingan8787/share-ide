import * as ElIcons from '@element-plus/icons';

// https://cn.vitejs.dev/guide/features.html#json
/**
 * https://blog.csdn.net/m0_67393593/article/details/123432324
 * import.meta.glob 为过动态导入，构建时，会分离为独立的 chunk
 * import.meta.globEager 为直接引入
 */
const Components = import.meta.globEager('../components/**/*.vue');
const ExeComponents = import.meta.globEager('../exe-components/**/*.vue');
const ExeSchemaTemp = import.meta.globEager('../exe-schema-template/**/*.vue');
const ExeSchemaConfig = import.meta.globEager('../exe-schema-template/**/config.js');

const register = (app: any, ctx: any) => {
    for (const path in ctx) {
        const mod = ctx[path];
        const compoent = mod.default || mod;
        console.log('compoent',compoent)
        app.component(compoent.name, compoent)
    }
    return app;
}

// 全局注册所有组件
export const globalRegisterComponent = (app: any) => {
    app = register(app, Components);    // 注册全局布局组件
    app = register(app, ExeComponents); // 注册全局物料组件
    app = register(app, ExeSchemaTemp); // 注册全局 Schema 组件

    return app;
}

// 全局注册所有图标
export const globalRegisterIcon = (app: any) => {
    for (const name in ElIcons){
        app.component(name,(ElIcons as any)[name])
    }
    return app;
}

// 全局注册所有组件默认配置
export const globalRegisterConfig = (app: any) => {
    let defaultValue: any = {};
    for (const path in ExeSchemaConfig) {
        const curValue = ExeSchemaConfig[path];
        const [, , , name] = path.split('/');
        defaultValue[name] = { ...(curValue.default || curValue) }
    }
    app.config.globalProperties.$exeDefaultValue = defaultValue;
    return app;
}

