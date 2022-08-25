import Keys from "../../../../keys.js";
import Director from "../../director/Director.js";
export default class Single {
    static reload(scene: Phaser.Scene, director: Director) {
        scene.sound.stopByKey(Keys.Audio.BGM);
        scene.sound.play(Keys.Audio.BGM, {
            loop: true
        });

        director.CombatzoneDirector.setRectDefault(true);
    }
}