const axios = require('axios').default;

const api = axios.create({
  baseURL: 'http://Chaekbonnal-env.eba-kdn2qrf7.ap-northeast-2.elasticbeanstalk.com',
  timeout: 10000
});

export default api
