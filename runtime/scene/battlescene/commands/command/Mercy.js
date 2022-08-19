import Keys from "../../../../keys.js";
export default class Mercy {
    constructor(command) {
        this.command = command;
        this.texts = ["spare"];
    }
    texts;
    command;
    startInit() {
        const CO = this.command;
        const X = CO.textsPos[0].x + 10, Y = CO.textsPos[0].y + 16;
        CO.diaTexts[0].setText("  * " + this.texts);
        CO.Heart.Image.setPosition(X, Y);
    }
    getActions() {
        return this.texts;
    }
    action() {
        this.command.SCENE.events.emit(Keys.Event.endTurn);
        this.command.resetButtons();
    }
    update() { }
}
//# sourceMappingURL=Mercy.js.map