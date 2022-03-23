import { defineStore } from 'pinia'

export default defineStore({
    id: 'schemaStore',
    state() {
        return {
            components: [123],
            editData: [],
            curComponent: {},
        }
    }
})
