const AUTH_TOKEN_KEY = 'auth:jwt:v1';

class Auth {
    _token = localStorage.getItem(AUTH_TOKEN_KEY)
    get() {
        return this._token;
    }
    set(token) {
        this._token = token;
        localStorage.setItem(AUTH_TOKEN_KEY);
    }
}

export default new Auth();
