
import * as ElIcons from '@element-plus/icons'

const Components = import.meta.glob('../components/**/*.vue');
const ExeComponents = import.meta.glob('../exe-components/**/*.vue');

const register = async (app: any, ctx: any) => {
    /**
     * 约定文件目录必须是 ../一层目录/目标组件 格式
     */
    for (const path in ctx) {
        const [,, name] = path.split('/');
        const mod = await ctx[path]();
        const compoent = mod.default || mod;
        app.component(name, compoent)
    }
    return app;
}

// 全局注册所有组件
export const globalRegister = async (app: any) => {
    app = await register(app, Components);    // 注册全局布局组件
    app = await register(app, ExeComponents); // 注册全局物料组件

    return app;
}

// 全局注册所有图标
export const globalRegisterIcon = async (app: any) => {
    for (const name in ElIcons){
        app.component(name,(ElIcons as any)[name])
    }
    return app;
}