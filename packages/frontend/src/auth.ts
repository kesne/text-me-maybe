const AUTH_TOKEN_KEY = 'auth:jwt:v1';

type Callback = (token: string) => void;

class Auth {
    private token: string | null = localStorage.getItem(AUTH_TOKEN_KEY);
    private cbs: Set<Callback> = new Set();

    get() {
        return this.token;
    }
    set(token: string) {
        this.token = token;
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        this.notify();
    }
    clear() {
        this.token = null;
        localStorage.clear();
        this.notify();
    }
    subscribe(cb: Callback) {
        this.cbs.add(cb);
        return () => {
            this.cbs.delete(cb);
        };
    }
    notify() {
        this.cbs.forEach((cb) => {
            cb(this.token as string);
        });
    }
}

export default new Auth();
