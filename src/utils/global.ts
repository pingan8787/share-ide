import { getCurrentInstance } from 'vue';

export const getProperty = (key: string) => {
    if(!key) return;
    const instance = <any>getCurrentInstance();
    return instance.appContext.config.globalProperties[key];
}
