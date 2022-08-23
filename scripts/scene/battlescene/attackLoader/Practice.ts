import Keys from "../../../keys.js";
export default class Practice {
    static showPassed(scene: Phaser.Scene, Passed: boolean) {
        let text = scene.add.text(
            320, 50, Passed ? "success" : "failure", {
            fontFamily: "damageFont",
            color: Passed ? "#0f0" : "#c00",
            fontSize: "32px"
        }
        );
        text.setOrigin(0.5);
        text.setDepth(Keys.Depth.debug);
        scene.time.delayedCall(1000, () => {
            if (text && text.scene) {
                text.destroy();
            }
        });
    }
}