export default function () {
    for (const key in this.Zones) {
        if (Object.prototype.hasOwnProperty.call(this.Zones, key)) {
            const element = this.Zones[key];
            if (key === "main") {
                continue;
            }
            element.clear(false, true);
        }
    }
}
//# sourceMappingURL=removeAll.js.map