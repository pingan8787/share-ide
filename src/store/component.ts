import { defineStore } from 'pinia';
import { noEmptyObject } from '@/utils/utils';

export default defineStore({
    id: 'componentStore',
    state() {
        return {
            editData: [],
            curComponent: {},
            showCurComponent: false
        }
    },
    actions: {
        isCurComponent(id: number | string){
            return this.curComponent.id === id;
        },
        hasCurComponent(){
            return noEmptyObject(this.curComponent);
        }
    }
})
