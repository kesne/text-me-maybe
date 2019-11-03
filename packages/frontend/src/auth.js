const AUTH_TOKEN_KEY = 'auth:jwt:v1';

class Auth {
    // _token = localStorage.getItem(AUTH_TOKEN_KEY)
    _token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTU3Mjc1OTUxNiwiZXhwIjoxNTczNjIzNTE2fQ.oj7I5A9oDPUedL7beokihslw5cOXjOlfM0MNWN8abfk';
    get() {
        return this._token;
    }
    set(token) {
        this._token = token;
        localStorage.setItem(AUTH_TOKEN_KEY);
    }
}

export default new Auth();
