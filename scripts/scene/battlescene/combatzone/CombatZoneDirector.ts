import BattleScene from "../BattleScene.js";
import Director from "../director/Director.js";
import CombatZone from "./box/combatzone.js";
import Bone from "../bone/bone.js";
import PlatForm from "../platForm/platform.js";
import { SetRectConfig } from "../../../Types.js";
import setRectDefault from "./setRectDefault.js";
import router from "./router.js";
import getZone from "./getZone.js";
import getIn from "./getIn.js";
import removeAll from "./removeAll.js";
export default class CombatZoneDirector extends Phaser.GameObjects.Group {
    constructor(scene: BattleScene, collide: number, heartCol: number, director: Director) {
        super(scene);
        this.collide = collide;
        this.heartCol = heartCol;
        this.director = director;

        this.draws = [];

        this.menuRect = {
            x: 30,
            y: 250,
            dx: 600,
            dy: 385,
            duration: 200,
            inst: false,
            zone: "main",
            ease: "Linear",
            relPointX: 0,
            relPointY: 0
        };
        this.thickness = 6;

        this.setRectDefault = setRectDefault;
        this.router = router;
        this.getZone = getZone;
        this.getIn = getIn;
        this.removeAll = removeAll;

        this.Zones = {
            main: new CombatZone(scene, collide, heartCol, director, this)
        };
    }
    thickness: number;
    Zones: {
        readonly main: CombatZone;
        [k: string]: CombatZone;
    };
    /**combatzone collide category */
    readonly collide: number;
    /**heart collide category */
    readonly heartCol: number;
    readonly director: Director;
    draws: (
        Bone |
        PlatForm |
        Phaser.GameObjects.Text |
        Phaser.GameObjects.Sprite |
        Phaser.GameObjects.Graphics)[];
    /**dialog box. used for initialize. */
    readonly menuRect: Required<Readonly<SetRectConfig>>;

    readonly setRectDefault: typeof setRectDefault;
    readonly getZone: typeof getZone;
    readonly getIn: typeof getIn;
    readonly removeAll: typeof removeAll;
    readonly router: typeof router;
    public get midDialogPoint(): Phaser.Math.Vector2 {
        const X: number = (this.menuRect.x + this.menuRect.dx) / 2;
        const Y: number = (this.menuRect.y + this.menuRect.dy) / 2;
        return new Phaser.Math.Vector2(X, Y);
    }
    update(updateDisplay?: boolean) {
        for (const key in this.Zones) {
            if (Object.prototype.hasOwnProperty.call(this.Zones, key)) {
                const element = this.Zones[key];
                element.update(this.draws, updateDisplay);
            }
        }
    }
}