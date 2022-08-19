import Keys from "../../../keys.js";
import Fight from "./command/Fight.js";
import Act from "./command/Act.js";
import Item from "./command/Item.js";
import Mercy from "./command/Mercy.js";
import update from "./update.js";
/**
 * player turn system.
 */
export default class Commands {
    /**
     *
     * @param SCENE BattleScene reference.
     * @param OPERATOR Operator reference.
     */
    constructor(SCENE, OPERATOR, heart, combatzone, statuses) {
        this.SCENE = SCENE;
        this.director = OPERATOR;
        this.depth = Keys.Depth.command;
        this.buttonPos = [];
        const SPRITES = [Keys.Sheet.fight, Keys.Sheet.act, Keys.Sheet.item, Keys.Sheet.mercy];
        this.#buttons = [];
        this.diaTexts = [];
        this.selectAct = 0;
        this.#selectedCommand = 0;
        this.commandType = 0;
        //this.page = 0
        this.#pageAction = [!0, !0, !0, !0];
        this.endingTurn = false;
        this.Fight = new Fight(this);
        this.Act = new Act(this);
        this.Item = new Item(this);
        this.Mercy = new Mercy(this);
        this.Heart = heart;
        this.Combatzone = combatzone;
        this.Statuses = statuses;
        //make buttons position.
        for (let index = 0; index < SPRITES.length; index++) {
            this.buttonPos[index] = { x: 85 + 155 * index, y: 450, Image: SPRITES[index] };
        }
        const POSES = this.buttonPos;
        //set buttons.
        for (let index = 0; index < POSES.length; index++) {
            const elem = POSES[index];
            this.#buttons[index] = SCENE.add.sprite(elem.x, elem.y, elem.Image, 0).setDepth(this.depth);
        }
        /**text config. */
        const texCon = {
            fontFamily: "battlefont",
            fontSize: "128px",
            maxLines: 3,
            padding: { bottom: 300 },
        };
        this.textsPos = [{ x: 0, y: 0 }];
        this.diaTexts = [];
        const START_POS = {
            x: this.director.CombatzoneDirector.menuRect.x + 10,
            y: this.director.CombatzoneDirector.menuRect.y + 10
        };
        const PADDING = { x: 250, y: 50 };
        //set text pos to
        //0 1
        //2 3
        for (let index = 0; index < 4; index++) {
            const TEXT_POS = {
                x: START_POS.x + PADDING.x * (index % 2),
                y: START_POS.y + PADDING.y * Math.floor(index / 2)
            };
            this.textsPos[index] = { x: TEXT_POS.x, y: TEXT_POS.y };
            this.diaTexts[index] = SCENE.add.text(TEXT_POS.x, TEXT_POS.y, "", texCon).setScale(0.25).setDepth(this.depth);
        }
        this.diaTexts.forEach((value) => {
            value.setVisible(false);
        });
        this.setTextsActive(false);
        this.update = update;
    }
    depth;
    SCENE;
    director;
    /**used for stop roll texts. */
    textId;
    #buttons;
    buttonPos;
    /**0=fight,1=act,2=item,3=mercy */
    #selectedCommand;
    selectAct;
    commandType;
    diaTexts;
    textsPos;
    /**how many have choices. */
    #pageAction;
    /**Is this update use command update?*/
    endingTurn;
    Heart;
    Combatzone;
    Statuses;
    Fight;
    Act;
    Item;
    Mercy;
    update;
    /**
     * set commands texts active.
     * @param isActive is texts active.
     */
    setTextsActive(isActive) {
        this.resetTexts(this.diaTexts);
        for (const text of this.diaTexts) {
            if (text.scene) {
                text.setActive(isActive);
            }
        }
        if (isActive) {
            this.director.CombatzoneDirector.draws = this.director.CombatzoneDirector.draws.concat(this.diaTexts);
        }
    }
    /**
     * add text rolling and reset text.
     * @param  add add to this Text object.
     * @param text add text
     * @return timeInterval id.
     */
    rollDiaText(add, text) {
        const length = text.length;
        let i = 0;
        return this.SCENE.time.addEvent({
            callback: () => {
                add.text += text[i];
                this.SCENE.sound.play(Keys.Audio.battleText);
                if (i >= length - 1)
                    this.SCENE.events.emit(Keys.Event.endRoll);
                ++i;
            },
            repeat: length - 1,
            delay: 25
        });
    }
    /**
     * set button frame and set heart position.
     */
    updateCommand() {
        for (const BUTTON of this.#buttons) {
            BUTTON.setFrame(0);
        }
        const select = this.buttonPos;
        this.Heart.Image.setPosition(select[this.#selectedCommand].x - 40, select[this.#selectedCommand].y);
        this.Heart.Image.setAngle(0);
        this.#buttons[this.#selectedCommand].setFrame(1);
    }
    /**
     * used for first select
     * @param cursorKey touched key, "left" or "right".
     */
    keyTouch(cursorKey) {
        switch (cursorKey) {
            case "left":
                if (this.#selectedCommand <= 0) {
                    this.#selectedCommand = this.buttonPos.length - 1;
                    break;
                }
                else
                    this.#selectedCommand--;
                break;
            case "right":
                if (this.#selectedCommand >= this.buttonPos.length - 1) {
                    this.#selectedCommand = 0;
                    break;
                }
                else
                    this.#selectedCommand++;
                break;
        }
        this.SCENE.sound.play(Keys.Audio.cursor);
    }
    /**
     * get command.
     * @returns return selected command default is fight.
     */
    getCommands() {
        switch (this.#selectedCommand) {
            case 0:
                return this.Fight;
            case 1:
                return this.Act;
            case 2:
                return this.Item;
            case 3:
                return this.Mercy;
            default: console.error(this.#selectedCommand, "error in getCommands");
        }
        return this.Fight;
    }
    /**
     * is command had any choices.
     */
    howManyActions() {
        let nowPage = this.getCommands().getActions(), Actions = [];
        for (const action of nowPage) {
            Actions.push(Boolean(action));
        }
        this.#pageAction = Actions;
    }
    /**
     * used for action select
     * @param cursorKey touched key "left","right","up" or "down".
     */
    selectAction(cursorKey) {
        //text pos is
        //0 1
        //2 3
        let moved = false;
        if (this.#selectedCommand === 2 && this.Item.texts.length > 3) {
            switch (cursorKey) {
                case "left":
                    if (this.selectAct % 2 === 0) {
                        this.Item.flip();
                    }
                    break;
                case "right":
                    if (this.selectAct % 2 === 1) {
                        this.Item.flip();
                    }
                    break;
            }
        }
        this.howManyActions();
        switch (cursorKey) {
            case "left":
            case "right":
                if (this.selectAct % 2 === 0) {
                    if (this.#pageAction[this.selectAct + 1]) {
                        this.selectAct++;
                        moved = true;
                    }
                    break;
                }
                if (this.selectAct % 2 === 1) {
                    if (this.#pageAction[this.selectAct - 1]) {
                        this.selectAct--;
                        moved = true;
                    }
                    break;
                }
                break;
            case "up":
            case "down":
                if (this.selectAct <= 1) {
                    if (this.#pageAction[this.selectAct + 2]) {
                        this.selectAct += 2;
                        moved = true;
                    }
                    break;
                }
                if (this.selectAct >= 2) {
                    if (this.#pageAction[this.selectAct - 2]) {
                        this.selectAct -= 2;
                        moved = true;
                    }
                    break;
                }
                break;
        }
        if (!moved) {
            this.selectAct = 0;
        }
        else {
            this.SCENE.sound.play(Keys.Audio.cursor);
        }
    }
    /**
     * update Menu. if Touched keys.
     * @param cursorKey touched key "left","right","up" or "down".
     */
    updateMenu(cursorKey) {
        this.selectAction(cursorKey);
        const X = this.textsPos[this.selectAct].x + 10, Y = this.textsPos[this.selectAct].y + 16;
        this.Heart.Image.setPosition(X, Y);
    }
    ;
    /**
     * show texts for player.
     */
    actionInit() {
        this.SCENE.sound.play(Keys.Audio.select);
        this.selectAct = 0;
        this.getCommands().startInit();
    }
    ;
    /**
     * reset text
     * @param texts reset text object.
     */
    resetTexts(texts) {
        for (const iterator of texts) {
            if (iterator.scene) {
                iterator.setText("");
            }
        }
    }
    ;
    /**
     * reset button frames.
     */
    resetButtons() {
        for (const BUTTON of this.#buttons) {
            BUTTON.setFrame(0);
        }
    }
    /**
     * initialize!
     */
    playerTurnInit() {
        this.setTextsActive(true);
        this.updateCommand();
        if (this.director.AttackLoader.resting) {
            this.textId = this.rollDiaText(this.diaTexts[0], Keys.Text.resting);
        }
        else {
            this.textId = this.rollDiaText(this.diaTexts[0], Keys.Text.batTime);
        }
        this.SCENE.events.once(Keys.Event.endTurn, this.director.AttackLoader.endPlayerTurn.bind(this.director.AttackLoader));
    }
    ;
    endPlayerTurn() {
        this.commandType = 0;
        this.setTextsActive(false);
        this.endingTurn = false;
    }
}
//# sourceMappingURL=Commands.js.map