

export const registerSchema = async (app: any) => {
    const ExeSchemas = import.meta.glob('../exe-components/**/*.json');
    let attrs: any = {}, schema: any = [];
    for (const path in ExeSchemas) {
        const [,, name] = path.split('/');
        const curSchema = await ExeSchemas[path]();
        const config = { component: name, ...(curSchema.default || curSchema)}

        attrs[name] = config.attrs;
        schema.push(config);
    }
    app.config.globalProperties.$exeAttrs = attrs;
    app.config.globalProperties.$exeSchema = schema;
    return app;
}
