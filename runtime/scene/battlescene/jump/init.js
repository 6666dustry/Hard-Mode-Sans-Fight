export default function init() {
    for (const key in this.counter) {
        if (Object.prototype.hasOwnProperty.call(this.counter, key)) {
            this.counter[key] = undefined;
        }
    }
}
//# sourceMappingURL=init.js.map