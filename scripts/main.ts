import MainMenu from "./scene/MainMenu.js";
import BattleScene from "./scene/battlescene/BattleScene.js";
import GameOver from "./scene/GameOver.js";
import SingleSelect from "./scene/SingleSelect.js";
import PauseScene from "./scene/PauseScene.js";
import Setting from "./scene/Setting.js";

/*

undertale by Tobyfox.

phaser3 by photonstorm.

inspired by c2 sans fight 

    link:https://jcw87.github.io/c2-sans-fight

*/
export const gameDebug: boolean = !0;
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