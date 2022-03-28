export default {
    label: '链接选择器',
    type: 'link',
    property: '',
    value: '',
    options: {
        placeholder: '请选择',
        options: [
            { label: '手动输入链接', value: 'input' },
            // { label: '选择远程链接', value: 'select' },
            { label: '请求远程链接', value: 'remote' },
        ],
        originUrl: 'https://www.qq.com',
        defaultOption: 'input'
    }
}