import * as ElIcons from '@element-plus/icons';

const Components = import.meta.glob('../components/**/*.vue');
const ExeComponents = import.meta.glob('../exe-components/**/*.vue');
const ExeSchemaTemp = import.meta.glob('../exe-schema-template/**/*.vue');
const ExeSchemaConfig = import.meta.glob('../exe-schema-template/**/config.js');

const register = async (app: any, ctx: any) => {
    for (const path in ctx) {
        const mod = await ctx[path]();
        const compoent = mod.default || mod;
        app.component(compoent.name, compoent)
    }
    return app;
}

// 全局注册所有组件
export const globalRegisterComponent = async (app: any) => {
    app = await register(app, Components);    // 注册全局布局组件
    app = await register(app, ExeComponents); // 注册全局物料组件
    app = await register(app, ExeSchemaTemp); // 注册全局 Schema 组件

    return app;
}

// 全局注册所有图标
export const globalRegisterIcon = async (app: any) => {
    for (const name in ElIcons){
        app.component(name,(ElIcons as any)[name])
    }
    return app;
}

// 全局注册所有组件默认配置
export const globalRegisterConfig = async (app: any) => {
    let defaultValue: any = {};
    for (const path in ExeSchemaConfig) {
        const curValue = await ExeSchemaConfig[path]();
        const [, , , name] = path.split('/');
        defaultValue[name] = { ...(curValue.default || curValue) }
    }
    app.config.globalProperties.$exeDefaultValue = defaultValue;
    return app;
}

