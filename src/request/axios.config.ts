import axios from 'axios';

const config = {
//   baseURL: 'https://www.baidu.com/api',
  timeout: 1000,
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
};

const api = axios.create(config);

// TODO: 补充拦截器

// api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;