

// register(require.context('@/exe-components', true, /.vue/))

// const register = ctx => {

// }

const Components = import.meta.glob('../components/**/*.vue');
const ExeComponents = import.meta.glob('../exe-components/**/*.vue');

const register = async (app, ctx) => {
    for (const path in ctx) {
        const mod = await ctx[path]();
        const compoent = mod.default || mod;
        app.component(compoent.name, compoent)
    }
    return app;
}


export const globalRegister = async (app) => {
    app = await register(app, Components);    // 注册全局布局组件
    app = await register(app, ExeComponents); // 注册全局物料组件

    return app;
}