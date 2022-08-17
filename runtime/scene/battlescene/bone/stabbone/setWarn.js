function setWarn() {
    const PADDING = 2;
    const THICKNESS = this.director.CombatzoneDirector.thickness;
    switch (this.direction) {
        case "up": {
            let startFrom = this.addTo.getBottomLeft();
            const MAX = this.addTo.getBottomRight();
            this.warnBox.strokeRect(startFrom.x + (THICKNESS + PADDING), startFrom.y + PADDING, MAX.x - (startFrom.x + (THICKNESS * 2 + PADDING * 2)), this.length);
            break;
        }
        case "right": {
            let startFrom = this.addTo.getTopLeft();
            const MAX = this.addTo.getBottomLeft();
            this.warnBox.strokeRect(startFrom.x - PADDING, startFrom.y + (THICKNESS + PADDING), -this.length, MAX.y - (startFrom.y + (THICKNESS * 2 + PADDING * 2)));
            break;
        }
        case "down": {
            let startFrom = this.addTo.getTopRight();
            const MAX = this.addTo.getTopLeft();
            this.warnBox.strokeRect(startFrom.x - (THICKNESS + PADDING), startFrom.y - PADDING, MAX.x - (startFrom.x - (THICKNESS * 2 + PADDING * 2)), -this.length);
            break;
        }
        case "left": {
            let startFrom = this.addTo.getTopRight();
            const MAX = this.addTo.getBottomRight();
            this.warnBox.strokeRect(startFrom.x + PADDING, startFrom.y + (PADDING + THICKNESS), this.length, MAX.y - (startFrom.y + (THICKNESS * 2 + PADDING * 2)));
            break;
        }
    }
    this.director.CombatzoneDirector.draws.push(this.warnBox);
}
export default setWarn;
//# sourceMappingURL=setWarn.js.map