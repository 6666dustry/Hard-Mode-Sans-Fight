import BattleScene from "../BattleScene.js";
import Keys from "../../../keys.js";
import Director from "../director/Director.js";
import debugUpdate from "./debugUpdate.js";
import setMode from "./setMode.js";
export default class Debug extends Phaser.GameObjects.Container {
    constructor(scene: BattleScene, director: Director) {
        super(scene);

        this.director = director;
        this.showParameter = scene.add.text(0, 0, "", {
            fontFamily: "battlefont",
            fontSize: "64px",
        }).setScale(1 / 4).setDepth(Keys.Depth.debug);

        this.state = "running";

        this.setMode = setMode;
        this.update = debugUpdate;
    }
    readonly director: Director;
    declare scene: BattleScene;
    showParameter: Phaser.GameObjects.Text;
    state: "sleep" | "running";
    setMode: typeof setMode;
}