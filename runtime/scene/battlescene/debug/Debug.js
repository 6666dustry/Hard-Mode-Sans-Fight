import Keys from "../../../keys.js";
import debugUpdate from "./debugUpdate.js";
import setMode from "./setMode.js";
class Debug extends Phaser.GameObjects.Container {
    constructor(scene, director) {
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
    director;
    showParameter;
    state;
    setMode;
}
export default Debug;
//# sourceMappingURL=Debug.js.map