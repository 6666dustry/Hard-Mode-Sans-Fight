import stabBone from "./stabBone.js";

function setWarn(this: stabBone) {
    const PADDING: 2 = 2;
    const THICKNESS: number = this.director.CombatzoneDirector.thickness;
    switch (this.direction) {
        case "up": {
            let startFrom: Phaser.Math.Vector2 = this.addTo.getBottomLeft();
            const MAX: Phaser.Math.Vector2 = this.addTo.getBottomRight();
            this.warnBox.strokeRect(
                startFrom.x + (THICKNESS + PADDING),
                startFrom.y + PADDING,
                MAX.x - (startFrom.x + (THICKNESS * 2 + PADDING * 2)),
                this.length);
            break;
        }


        case "right": {
            let startFrom: Phaser.Math.Vector2 = this.addTo.getTopLeft();
            const MAX: Phaser.Math.Vector2 = this.addTo.getBottomLeft();
            this.warnBox.strokeRect(
                startFrom.x - PADDING,
                startFrom.y + (THICKNESS + PADDING),
                -this.length,
                MAX.y - (startFrom.y + (THICKNESS * 2 + PADDING * 2)));
            break;
        }


        case "down": {
            let startFrom: Phaser.Math.Vector2 = this.addTo.getTopRight();
            const MAX: Phaser.Math.Vector2 = this.addTo.getTopLeft();
            this.warnBox.strokeRect(
                startFrom.x - (THICKNESS + PADDING),
                startFrom.y - PADDING,
                MAX.x - (startFrom.x - (THICKNESS * 2 + PADDING * 2)),
                -this.length);
            break;
        }


        case "left": {
            let startFrom: Phaser.Math.Vector2 = this.addTo.getTopRight();
            const MAX: Phaser.Math.Vector2 = this.addTo.getBottomRight();
            this.warnBox.strokeRect(
                startFrom.x + PADDING,
                startFrom.y + (PADDING + THICKNESS),
                this.length,
                MAX.y - (startFrom.y + (THICKNESS * 2 + PADDING * 2)));
            break;
        }
    }
    this.director.CombatzoneDirector.draws.push(this.warnBox);
}
export default setWarn;