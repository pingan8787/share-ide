export const registerSchema = (app: any) => {
    const IDESchemas = import.meta.globEager('../ide-components/**/*.json');
    let attrs: any = {}, schema: any = [];
    for (const path in IDESchemas) {
        const [, , name] = path.split('/');
        const curSchema = IDESchemas[path];
        const config = { component: name, ...(curSchema.default || curSchema) }
        attrs[name] = config.attrs;
        schema.push(initDefaultValue(config));
    }
    app.config.globalProperties.$GlobalAttrs = attrs;
    app.config.globalProperties.$GlobalSchema = schema;
    return app;
}

const initDefaultValue = (config: any = {}) => {
    let { component, name, icon, attrs } = config;
    let temp = { component, name, icon };
    setDefaultValue(attrs, temp);
    return temp;
}

const setDefaultValue = (attrs: any, temp: any) => {
    for (let key in attrs) {
        let { type, value, child } = attrs[key];
        if (type == 'object') {
            temp[key] = {};
            child && setDefaultValue(attrs[key].child, temp[key]);
        } else {
            temp[key] = value;
        }
    }
    return temp;
}