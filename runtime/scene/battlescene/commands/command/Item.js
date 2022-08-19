import Keys from "../../../../keys.js";
export default class Item {
    constructor(command, items) {
        this.command = command;
        this.texts = [
            "pie", "noodle", "steak", "snowPiece",
            "snowPiece", "snowPiece", "lHero", "lHero"
        ];
        this.page = 0;
        this.select = 0;
        this.choices = [false, false, false, false];
        if (items) {
            this.texts = items;
        }
    }
    texts;
    command;
    page;
    select;
    choices;
    textId;
    startInit() {
        const CO = this.command;
        const X = CO.textsPos[0].x + 10, Y = CO.textsPos[0].y + 16;
        CO.Heart.Image.setPosition(X, Y);
        CO.Heart.Image.setAngle(0);
        /** loop counter. max is 4. */
        let loopMax = this.texts.length;
        loopMax = loopMax <= 4 ? loopMax : 4;
        for (let index = 0; index < loopMax; index++) {
            const element = this.texts[index];
            CO.diaTexts[index].setText("  * " + Keys.Item[element].name);
        }
    }
    getActions() {
        return this.texts.slice(this.page * 4, this.page * 4 + 4);
    }
    flip() {
        if (this.texts.length <= 4) {
            return;
        }
        const CO = this.command;
        switch (this.page) {
            case 0:
                this.page++;
                break;
            case 1:
                this.page--;
                break;
        }
        const data = this.texts;
        CO.resetTexts(CO.diaTexts);
        for (let index = this.page * 4; index < 4 + this.page * 4; index++) {
            const element = data[index];
            if (element === undefined)
                break;
            CO.diaTexts[index % 4].setText("  * " + Keys.Item[element].name);
        }
    }
    action(zKey) {
        const CO = this.command;
        const ARG = this.texts[CO.selectAct + this.page * 4];
        if (!(CO.SCENE.config.settings && CO.SCENE.config.settings.infItem)) {
            this.texts.splice(CO.selectAct + this.page * 4, 1);
        }
        CO.resetButtons();
        this.page = 0;
        this.showSummery(Keys.Item[ARG], zKey);
    }
    zKeyEvent(zKey) {
        zKey.once("down", this.endInit.bind(this));
    }
    /**
     * show item details.
     * @param item used item.
     */
    showSummery(item, zKey) {
        const CO = this.command;
        const IS_MAX = CO.Statuses.healHp(item);
        CO.resetTexts(CO.diaTexts);
        this.textId = CO.rollDiaText(CO.diaTexts[0], `* You eat the ${item.displayName}.
* You recovered ${item.amount}HP.${IS_MAX ? "\n* Your hp was maxed out!" : ""}`);
        CO.Heart.Image.setVisible(false);
        if (item.description) {
            CO.SCENE.events.once(Keys.Event.endRoll, this.showDetails.bind(this, item.description, zKey));
        }
        else {
            CO.SCENE.events.once(Keys.Event.endRoll, this.zKeyEvent.bind(this, zKey));
        }
    }
    showDetails(text, zKey) {
        zKey.once("down", () => {
            const CO = this.command;
            CO.diaTexts[0].setText("");
            this.textId = CO.rollDiaText(CO.diaTexts[0], text);
            CO.SCENE.events.once(Keys.Event.endRoll, this.zKeyEvent.bind(this, zKey));
        }, this);
    }
    endInit() {
        this.command.SCENE.events.emit(Keys.Event.endTurn);
        this.textId.remove();
    }
    update() { }
}
//# sourceMappingURL=Item.js.map