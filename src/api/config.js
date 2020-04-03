const axios = require('axios').default;

const api = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 10000
    // headers: {'X-Custom-Header': 'foobar'}
});

// # token 검증 방법

// 사용자는 서버에게서 토큰을 받은 후, 서버에게 요청을 보낼 때, request.Header에 토큰을 포함하여 요청을 보낸다.

// 그러면 서버는 사용자에게서 받은 토큰이 유효한 것인지 확인한다.

// const secretKey = ''; // 아까 token 만들때 썼던 secretkey
// const router = (req, res) => {
//   const token = req.headers['x-access-token'] || req.query.token;
//   jwt.verify(token, secretKey, 
//     function(err, decoded){
//       console.log(err) // 유효하지 않은 토큰
//       console.log(decoded) // 유효한 토큰, 유저 정보 Object 반환
//     }
// }
// jwt.verify()함수를 이용하여 토큰 유효성을 확인할 수 있다.


export default api;
