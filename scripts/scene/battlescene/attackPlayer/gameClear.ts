import Keys from "../../../keys.js";
import type { BattleStartConfig } from "../../../Types.js";
export default function gameClear(scene: Phaser.Scene, config: BattleStartConfig) {

    scene.scene.transition({
        target: Keys.Scene.mainMenu,
        remove: true,
        onUpdate: () => {
            let appear = true;
            scene.cameras.cameras.forEach((value) => {
                value.alpha -= 0.01;
                if (value.alpha > 0) {
                    appear = false;
                }
            });
            if (appear) {
                scene.scene.setVisible(true, Keys.Scene.mainMenu);
                scene.scene.get(Keys.Scene.mainMenu).cameras.cameras.forEach((value) => {
                    value.alpha += 0.01;
                });
            }
        },
        duration: 5000,
        data: [config],
    });
    scene.scene.setVisible(false, Keys.Scene.mainMenu);
    scene.scene.get(Keys.Scene.mainMenu).cameras.cameras.forEach((value) => {
        value.alpha = 0;
    });
}