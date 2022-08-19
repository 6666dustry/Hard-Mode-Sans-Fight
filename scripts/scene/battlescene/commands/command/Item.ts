import Keys from "../../../../keys.js";
import { ItemConfig } from "../../../../Types.js";
import Commands from "../Commands.js";
export default class Item {
    constructor(command: Commands, items?: (keyof typeof Keys.Item)[]) {
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
    texts: (keyof typeof Keys.Item)[];
    readonly command: Commands;
    page: number;
    select: number;
    choices: boolean[];
    textId!: Phaser.Time.TimerEvent;
    startInit(): void {
        const CO: Commands = this.command;
        const X: number = CO.textsPos[0].x + 10, Y: number = CO.textsPos[0].y + 16;

        CO.Heart.Image.setPosition(X, Y);
        CO.Heart.Image.setAngle(0);

        /** loop counter. max is 4. */
        let loopMax: number = this.texts.length;
        loopMax = loopMax <= 4 ? loopMax : 4;

        for (let index: number = 0; index < loopMax; index++) {
            const element: keyof typeof Keys.Item = this.texts[index];
            CO.diaTexts[index].setText("  * " + Keys.Item[element].name);
        }
    }
    getActions(): any[] {
        return this.texts.slice(this.page * 4, this.page * 4 + 4);
    }
    flip(): void {
        if (this.texts.length <= 4) {
            return;
        }
        const CO: Commands = this.command;
        switch (this.page) {
            case 0:
                this.page++;
                break;
            case 1:
                this.page--;
                break;
        }

        const data: (keyof typeof Keys.Item)[] = this.texts;
        CO.resetTexts(CO.diaTexts);
        for (let index: number = this.page * 4; index < 4 + this.page * 4; index++) {
            const element: keyof typeof Keys.Item = data[index];
            if (element === undefined)
                break;

            CO.diaTexts[index % 4].setText("  * " + Keys.Item[element].name);
        }
    }
    action(zKey: Phaser.Input.Keyboard.Key): void {
        const CO: Commands = this.command;
        const ARG: (keyof typeof Keys.Item) = this.texts[CO.selectAct + this.page * 4];

        if (!(CO.SCENE.config.settings && CO.SCENE.config.settings.infItem)) {
            this.texts.splice(CO.selectAct + this.page * 4, 1);
        }

        CO.resetButtons();
        this.page = 0;
        this.showSummery(Keys.Item[ARG], zKey);
    }
    zKeyEvent(zKey: Phaser.Input.Keyboard.Key): void {
        zKey.once("down", this.endInit.bind(this));
    }
    /**
     * show item details.
     * @param item used item.
     */
    showSummery(item: ItemConfig, zKey: Phaser.Input.Keyboard.Key): void {
        const CO: Commands = this.command;

        const IS_MAX: boolean = CO.Statuses.healHp(item);

        CO.resetTexts(CO.diaTexts);

        this.textId = CO.rollDiaText(
            CO.diaTexts[0],
            `* You eat the ${ item.displayName }.
* You recovered ${ item.amount }HP.${ IS_MAX ? "\n* Your hp was maxed out!" : "" }`);

        CO.Heart.Image.setVisible(false);

        if (item.description) {
            CO.SCENE.events.once(Keys.Event.endRoll, this.showDetails.bind(this, item.description, zKey));
        } else {
            CO.SCENE.events.once(Keys.Event.endRoll, this.zKeyEvent.bind(this, zKey));
        }
    }
    showDetails(text: string, zKey: Phaser.Input.Keyboard.Key) {
        zKey.once("down", () => {
            const CO: Commands = this.command;
            CO.diaTexts[0].setText("");
            this.textId = CO.rollDiaText(
                CO.diaTexts[0],
                text);

            CO.SCENE.events.once(Keys.Event.endRoll, this.zKeyEvent.bind(this, zKey));
        }, this);
    }
    endInit(): void {
        this.command.SCENE.events.emit(Keys.Event.endTurn);
        this.textId.remove();
    }
    update(): void { }
}