import type Commands from "../Commands.js";
import Keys from "../../../../keys.js";
export default class Mercy {
    constructor(command: Commands) {
        this.command = command;
        this.texts = ["spare"];
    }
    texts: any[];
    readonly command: Commands;
    startInit(): void {
        const CO: Commands = this.command;
        const X: number = CO.textsPos[0].x + 10, Y: number = CO.textsPos[0].y + 16;
        CO.diaTexts[0].setText("  * " + this.texts);

        CO.Heart.Image.setPosition(X, Y);
    }
    getActions(): any[] {
        return this.texts;
    }
    action(): void {
        this.command.scene.events.emit(Keys.Event.endTurn);
        this.command.resetButtons();
    }
    update() { }
}