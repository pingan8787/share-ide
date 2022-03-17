import useSchemaStore from '@/store/schema';

const ExeSchemas = import.meta.glob('../exe-components/**/*.json');


export const registerSchema = async (app) => {
    const schemaStore = useSchemaStore();
    // TODO 处理 schema，并保存到 schemaStore.components
    console.log('[registerSchema]', ExeSchemas)
    console.log('[schemaStore]', schemaStore.components)
    return app;
}
