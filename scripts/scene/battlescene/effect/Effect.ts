import type BattleScene from "../BattleScene.js";
import type Director from "../director/Director.js";
import router from "./router.js";
import flash from "./flash.js";
import falling from "./falling.js";
import removeAll from "./removeAll.js";
import Base from "../director/Base.js";
export default class Effect extends Base(class { }) {
    constructor(scene: BattleScene, director: Director) {
        super();
        this.BaseConstructor(scene, director);

        this.flash = flash;
        this.falling = falling;
        this.removeAll = removeAll;
        this.router = router;
    }
    readonly flash: typeof flash;
    readonly router: typeof router;
    readonly falling: typeof falling;
    readonly removeAll: typeof removeAll;
    fallingEnd!: Phaser.Time.TimerEvent;
}