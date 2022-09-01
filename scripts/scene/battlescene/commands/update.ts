import type Commands from "./Commands.js";
import type Fight from "./command/Fight.js";
import type Act from "./command/Act.js";
import type Item from "./command/Item.js";
import type Mercy from "./command/Mercy.js";
import type MoveKey from "../../../MoveKey.js";
import Keys from "../../../keys.js";
/**
* commands update.
* @param  cursors 
* @param  xKey 
* @param  zKey 
*/
export default function update(this: Commands, cursors: MoveKey, xKey: Phaser.Input.Keyboard.Key, zKey: Phaser.Input.Keyboard.Key): void {
    const NOWCOMMAND: Fight | Act | Item | Mercy = this.getCommands();

    if (this.endingTurn && NOWCOMMAND.update !== undefined) {
        NOWCOMMAND.update(cursors, xKey, zKey);
        return;
    }
    const JustDown: typeof Phaser.Input.Keyboard.JustDown = Phaser.Input.Keyboard.JustDown;
    switch (this.commandType) {
        case 0: {
            cursors.leftIsJustDown && this.keyTouch("left");
            cursors.rightIsJustDown && this.keyTouch("right");

            this.updateCommand();

            if (JustDown(zKey)) {
                this.textId.remove();
                this.commandType = 1;
                this.actionInit();
            } else if (xKey.ctrlKey) {
                this.scene.events.off(Keys.Event.endTurn);
                this.scene.sound.stopByKey(Keys.Audio.BGM);
                this.scene.scene.start(Keys.Scene.mainMenu, this.scene.config);
                break;
            }
            break;
        }
        case 1: {
            const UPMENU: typeof this.updateMenu = this.updateMenu.bind(this);

            cursors.leftIsJustDown && UPMENU("left");
            cursors.rightIsJustDown && UPMENU("right");
            cursors.upIsJustDown && UPMENU("up");
            cursors.downIsJustDown && UPMENU("down");

            if (JustDown(xKey)) {
                this.commandType = 0;
                this.resetTexts(this.diaTexts);
                this.dialogText();
                this.scene.sound.play(Keys.Audio.select);

            } else if (JustDown(zKey)) {
                this.scene.sound.play(Keys.Audio.select);
                this.endingTurn = true;
                NOWCOMMAND.action(zKey);
            }
            break;
        }
    }
}