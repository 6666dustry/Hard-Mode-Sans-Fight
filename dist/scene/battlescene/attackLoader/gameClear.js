import Keys from "../../../keys.js";
export default function gameClear(scene, config) {
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
        data: [config]
    });
    scene.scene.setVisible(false, Keys.Scene.mainMenu);
    scene.scene.get(Keys.Scene.mainMenu).cameras.cameras.forEach((value) => {
        value.alpha = 0;
    });
}
//# sourceMappingURL=gameClear.js.map