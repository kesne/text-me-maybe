export default class Cursor {
    static parse(cursor: string) {
        const [first, last] = Buffer.from(cursor, 'base64')
            .toString('utf8')
            .split(':');

        return new Cursor(+first, +last);
    }

    declare first: number;
    declare last: number;

    constructor(first: number, last: number) {
        this.first = first;
        this.last = last;
    }

    toString() {
        return Buffer.from(`${this.first}:${this.last}`).toString('base64');
    }
}
