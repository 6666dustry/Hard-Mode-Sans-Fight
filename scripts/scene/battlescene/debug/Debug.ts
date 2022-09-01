import BattleScene from "../BattleScene.js";
import Keys from "../../../keys.js";
import Director from "../director/Director.js";
import debugUpdate from "./debugUpdate.js";
import setMode from "./setMode.js";
import Base from "../director/Base.js";
export default class Debug extends Base(Phaser.GameObjects.Container) {
    constructor(scene: BattleScene, director: Director) {
        super(scene);
        this.BaseConstructor(scene, director);

        this.showParameter = scene.add.text(0, 0, "", {
            fontFamily: "battlefont",
            fontSize: "64px",
        }).setScale(1 / 4).setDepth(Keys.Depth.debug);

        this.state = "running";
        this.running = true;

        this.setMode = setMode;
        this.update = debugUpdate;
    }
    showParameter: Phaser.GameObjects.Text;
    state: "sleep" | "running";
    running: boolean;
    setMode: typeof setMode;
}