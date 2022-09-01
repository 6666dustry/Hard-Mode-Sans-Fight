import type BattleScene from "../BattleScene.js";
import type Director from "../director/Director.js";
import type Bone from "../bone/Bone.js";
import type PlatForm from "../platForm/platform.js";
import type { SetRectConfig } from "../../../Types.js";
import CombatZone from "./box/combatzone.js";
import setRectDefault from "./setRectDefault.js";
import router from "./router.js";
import getZone from "./getZone.js";
import removeAll from "./removeAll.js";
import Base from "../director/Base.js";
export default class CombatZoneDirector extends Base(Phaser.GameObjects.Group) {
    constructor(scene: BattleScene, collide: number, heartCol: number, director: Director) {
        super(scene);
        this.BaseConstructor(scene, director);
        this.collide = collide;
        this.heartCol = heartCol;

        this.draws = [];

        this.menuRect = {
            x: 35,
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