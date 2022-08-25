import Keys from "../../../../keys.js";
export default class Act {
    constructor(command) {
        this.command = command;
        this.texts = [["sans", ["check"], ["SANS 1 ATK 1 DEF\n* The easiest enemy.\n* Can only deal 1 damage."]]];
        this.select = 0;
        this.choices = [false, false, false, false];
        this.endAction = false;
    }
    choices;
    select;
    texts;
    command;
    endAction;
    textId;
    startInit() {
        const CO = this.command;
        const X = CO.textsPos[0].x + 10, Y = CO.textsPos[0].y + 16;
        CO.diaTexts[0].setText("  * " + this.texts[0][0]);
        CO.Heart.Image.setPosition(X, Y);
    }
    getActions() {
        return this.texts;
    }
    action() {
        const CO = this.command;
        for (let index = 0; index < this.texts[0][1].length; index++) {
            CO.diaTexts[index].setText("  * " + this.texts[0][1][index]);
            this.choices[index] = true;
        }
    }
    setHeartPos() {
        const CO = this.command;
        const X = CO.textsPos[this.select].x + 10, Y = CO.textsPos[this.select].y + 16;
        CO.Heart.Image.setPosition(X, Y);
    }
    selectAct(cursor) {
        let moved = false;
        switch (cursor) {
            case "left":
            case "right":
                if (this.select % 2 === 0) {
                    if (this.choices[this.select + 1]) {
                        this.select++;
                        moved = true;
                    }
                    break;
                }
                if (this.select % 2 === 1) {
                    if (this.choices[this.select - 1]) {
                        this.select--;
                        moved = true;
                    }
                    break;
                }
                break;
            case "up":
            case "down":
                moved = true;
                if (this.select <= 1) {
                    if (this.choices[this.select + 2]) {
                        this.select += 2;
                    }
                    break;
                }
                if (this.select >= 2) {
                    if (this.choices[this.select - 2]) {
                        this.select -= 2;
                    }
                    break;
                }
                break;
        }
        if (!moved) {
            this.select = 0;
        }
        this.setHeartPos();
    }
    endInit() {
        this.command.SCENE.events.emit(Keys.Event.endTurn);
        this.textId.remove();
        this.endAction = false;
    }
    zKeyEvent(zKey) {
        zKey.once("down", this.endInit.bind(this));
    }
    update(cursors, xKey, zKey) {
        if (this.endAction)
            return;
        const CO = this.command;
        const JustDown = Phaser.Input.Keyboard.JustDown;
        cursors.leftIsJustDown && this.selectAct("left");
        cursors.rightIsJustDown && this.selectAct("right");
        cursors.upIsJustDown && this.selectAct("up");
        cursors.downIsJustDown && this.selectAct("down");
        if (JustDown(xKey)) {
            CO.endingTurn = false;
            CO.actionInit();
        }
        else if (JustDown(zKey)) {
            CO.SCENE.sound.play(Keys.Audio.select);
            CO.resetTexts(CO.diaTexts);
            this.textId = CO.rollDiaText(CO.diaTexts[0], "* " + this.texts[0][2][this.select]);
            CO.Heart.Image.setVisible(false);
            CO.resetButtons();
            this.endAction = true;
            CO.SCENE.events.once(Keys.Event.endRoll, this.zKeyEvent.bind(this, zKey));
        }
    }
}
//# sourceMappingURL=Act.js.map