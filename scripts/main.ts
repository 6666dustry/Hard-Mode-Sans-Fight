import MainMenu from "./scene/MainMenu.js";
import BattleScene from "./scene/battlescene/BattleScene.js";
import GameOver from "./scene/GameOver.js";
import SingleSelect from "./scene/SingleSelect.js";
import PauseScene from "./scene/PauseScene.js";
import Setting from "./scene/Setting.js";

/*

undertale by Tobyfox.
    
    link:https://undertale.com

phaser3 by photonstorm.

    link:https://www.phaser.io/phaser3

inspired by c2 sans fight.

    link:https://jcw87.github.io/c2-sans-fight

license:MIT License.
*/
//can switch debug.
//if debug, then press H key to restore health.
//and press t key then pause game.
export const gameDebug: boolean = !1;
const MDebug: Phaser.Types.Physics.Matter.MatterDebugConfig = {
    showVelocity: true,
    showCollisions: true,
    showAxes: true,
    showBounds: true,
    showBody: true
};

var config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: "matter",
        matter: {
            debug: gameDebug ? MDebug : false,
            gravity: {
                x: 0,
                y: 0
            },
        }
    },
    backgroundColor: "#000000",
    scene: [MainMenu, SingleSelect, BattleScene, GameOver, PauseScene, Setting],
    pixelArt: true,
};
let game = new Phaser.Game(config);