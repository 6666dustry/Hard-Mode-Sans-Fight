import type BattleScene from "scene/battlescene/BattleScene.js";
import type CombatZoneDirector from "../combatzone/CombatZoneDirector.js";
import type Heart from "../heart/Heart.js";
import type Director from "../director/Director.js";
import type Statuses from "../statuses/Statuses.js";
import Keys from "../../../keys.js";
import Fight from "./command/Fight.js";
import Act from "./command/Act.js";
import Item from "./command/Item.js";
import Mercy from "./command/Mercy.js";
import update from "./update.js";
import selectAction from "./selectAction.js";
import Base from "../director/Base.js";
/**
 * player turn system.
 */
export default class Commands extends Base(class { })
{
    /**
     * 
     * @param scene BattleScene reference.
     * @param director Operator reference.
     */
    constructor(scene: BattleScene, director: Director, heart: Heart, combatzone: CombatZoneDirector, statuses: Statuses) {
        super();
        this.BaseConstructor(scene, director);

        this.depth = Keys.Depth.command;
        this.buttonPos = [];
        const SPRITES: string[] = [Keys.Sheet.fight, Keys.Sheet.act, Keys.Sheet.item, Keys.Sheet.mercy];

        this.buttons = [];
        this.diaTexts = [];
        this.selectAct = 0;
        this.selectedCommand = 0;
        this.commandType = 0;
        this.pageAction = [!0, !0, !0, !0];
        this.endingTurn = false;

        this.Fight = new Fight(this);
        this.Act = new Act(this);
        this.Item = new Item(this);
        this.Mercy = new Mercy(this);

        this.Heart = heart;
        this.Combatzone = combatzone;
        this.Statuses = statuses;

        //make buttons position.
        for (let index: number = 0; index < SPRITES.length; index++) {
            this.buttonPos[index] = { x: 85 + 155 * index, y: 450, Image: SPRITES[index] };
        }

        const POSES: { x: number, y: number, Image: string; }[] = this.buttonPos;
        //set buttons.
        for (let index: number = 0; index < POSES.length; index++) {
            const elem: { x: number, y: number, Image: string; } = POSES[index];
            this.buttons[index] = scene.add.sprite(elem.x, elem.y, elem.Image, 0).setDepth(this.depth);
        }
        /**text config. */
        const texCon: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "battlefont",
            fontSize: "128px",
            maxLines: 3,
            padding: { bottom: 300 },
        };
        this.textsPos = [{ x: 0, y: 0 }];
        this.diaTexts = [];
        const START_POS: {
            readonly x: number,
            readonly y: number;
        } = {
            x: this.director.CombatzoneDirector.menuRect.x + 10,
            y: this.director.CombatzoneDirector.menuRect.y + 10
        };

        const PADDING: {
            readonly x: number,
            readonly y: number;
        } = { x: 250, y: 50 };
        //set text pos to
        //0 1
        //2 3
        for (let index: number = 0; index < 4; index++) {
            const TEXT_POS: {
                readonly x: number,
                readonly y: number;
            } = {
                x: START_POS.x + PADDING.x * (index % 2),
                y: START_POS.y + PADDING.y * Math.floor(index / 2)
            };
            this.textsPos[index] = { x: TEXT_POS.x, y: TEXT_POS.y };

            this.diaTexts[index] = scene.add.text(TEXT_POS.x, TEXT_POS.y, "", texCon).setScale(0.25).setDepth(this.depth);
        }
        this.diaTexts.forEach((value) => {
            value.setVisible(false);
        });

        this.setTextsActive(false);

        this.update = update;
        this.selectAction = selectAction;
    }
    readonly depth: number;
    /**0=fight,1=act,2=item,3=mercy */
    selectedCommand: number;
    selectAct: number;
    commandType: number;
    diaTexts: Phaser.GameObjects.Text[];
    readonly textsPos: { x: number, y: number; }[];
    /**how many have choices. */
    pageAction: boolean[];
    /**Is this update use command update?*/
    endingTurn: boolean;
    /**used for stop roll texts. */
    textId!: Phaser.Time.TimerEvent;
    buttons: Phaser.GameObjects.Sprite[];
    readonly buttonPos: { x: number, y: number, Image: string; }[];
    readonly Heart: Heart;
    readonly Combatzone: CombatZoneDirector;
    readonly Statuses: Statuses;
    readonly Fight: Fight;
    readonly Act: Act;
    readonly Item: Item;
    readonly Mercy: Mercy;
    readonly update: typeof update;
    readonly selectAction: typeof selectAction;
    /**
     * set commands texts active.
     * @param isActive is texts active.
     */
    setTextsActive(isActive: boolean) {
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
    rollDiaText(add: Phaser.GameObjects.Text, text: string): Phaser.Time.TimerEvent {
        const length: number = text.length;
        let i: number = 0;
        return this.scene.time.addEvent({
            callback: (): void => {
                add.setText(add.text + [text[i]]);
                this.scene.sound.play(Keys.Audio.battleText);

                if (i >= length - 1)
                    this.scene.events.emit(Keys.Event.endRoll);
                ++i;
            },
            repeat: length - 1,
            delay: 25
        });
    }
    /**
     * set button frame and set heart position.
     */
    updateCommand(): void {
        for (const BUTTON of this.buttons) {
            BUTTON.setFrame(0);
        }
        const select: any[] = this.buttonPos;
        this.Heart.Image.setPosition(
            select[this.selectedCommand].x - 40,
            select[this.selectedCommand].y);

        this.Heart.Image.setAngle(0);
        this.buttons[this.selectedCommand].setFrame(1);
    }
    /**
     * used for first select
     * @param cursorKey touched key, "left" or "right".
     */
    keyTouch(cursorKey: string) {
        switch (cursorKey) {
            case "left":
                if (this.selectedCommand <= 0) {
                    this.selectedCommand = this.buttonPos.length - 1;
                    break;
                } else this.selectedCommand--;
                break;
            case "right":
                if (this.selectedCommand >= this.buttonPos.length - 1) {
                    this.selectedCommand = 0;
                    break;
                } else this.selectedCommand++;
                break;
        }
        this.scene.sound.play(Keys.Audio.cursor);
    }
    /**
     * get command.
     * @returns return selected command default is fight.
     */
    getCommands(): Fight | Act | Item | Mercy {
        switch (this.selectedCommand) {
            case 0:
                return this.Fight;
            case 1:
                return this.Act;
            case 2:
                return this.Item;
            case 3:
                return this.Mercy;
            default: console.error(this.selectedCommand, "error in getCommands");
        }
        return this.Fight;
    }
    /**
     * is command had any choices.
     */
    howManyActions() {
        let nowPage: any[] = this.getCommands().getActions(), Actions: boolean[] = [];
        for (const action of nowPage) {
            Actions.push(Boolean(action));
        }
        this.pageAction = Actions;
    }
    /**
     * update Menu. if Touch cursor key.
     * @param cursorKey touched key "left","right","up" or "down".
     */
    updateMenu(cursorKey: "up" | "down" | "left" | "right"): void {
        this.selectAction(cursorKey);

        const X: number = this.textsPos[this.selectAct].x + 10, Y: number = this.textsPos[this.selectAct].y + 16;
        this.Heart.Image.setPosition(X, Y);
    };
    /**
     * show texts for player.
     */
    actionInit(): void {
        this.scene.sound.play(Keys.Audio.select);
        this.selectAct = 0;
        this.getCommands().startInit();
    };
    /**
     * reset text
     * @param texts reset text object.
     */
    resetTexts(texts: Phaser.GameObjects.Text[]): void {
        for (const iterator of texts) {
            if (iterator.scene) {
                iterator.setText("");
            }
        }
    };
    /**
     * reset button frames.
     */
    resetButtons() {
        for (const BUTTON of this.buttons) {
            BUTTON.setFrame(0);
        }
    }
    dialogText() {
        if (this.director.AttackLoader.resting) {
            this.textId = this.rollDiaText(this.diaTexts[0], Keys.Text.resting);
        } else {
            this.textId = this.rollDiaText(this.diaTexts[0], Keys.Text.batTime);
        }
    }
    /**
     * initialize!
     */
    playerTurnInit(): void {
        this.setTextsActive(true);
        this.updateCommand();
        this.dialogText();
        this.scene.events.once(Keys.Event.endTurn, this.director.AttackLoader.endPlayerTurn.bind(this.director.AttackLoader));
    };
    endPlayerTurn() {
        this.commandType = 0;
        this.setTextsActive(false);
        this.endingTurn = false;
    }
}