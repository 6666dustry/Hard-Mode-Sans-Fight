import Keys from "../../../keys.js";
function update(cursors, xKey, zKey) {
    const NOWCOMMAND = this.getCommands();
    if (this.endingTurn && NOWCOMMAND.update !== undefined) {
        NOWCOMMAND.update(cursors, xKey, zKey);
        return;
    }
    const JustDown = Phaser.Input.Keyboard.JustDown;
    switch (this.commandType) {
        case 0: {
            cursors.leftIsJustDown && this.keyTouch("left");
            cursors.rightIsJustDown && this.keyTouch("right");
            this.updateCommand();
            if (JustDown(zKey)) {
                this.textId.remove();
                this.commandType = 1;
                this.actionInit();
            }
            else if (xKey.ctrlKey) {
                this.SCENE.events.off(Keys.Event.endTurn);
                this.SCENE.sound.stopByKey(Keys.Audio.BGM);
                this.SCENE.scene.start(Keys.Scene.mainMenu, this.SCENE.config);
                break;
            }
            break;
        }
        case 1: {
            const UPMENU = this.updateMenu.bind(this);
            cursors.leftIsJustDown && UPMENU("left");
            cursors.rightIsJustDown && UPMENU("right");
            cursors.upIsJustDown && UPMENU("up");
            cursors.downIsJustDown && UPMENU("down");
            if (JustDown(xKey)) {
                this.commandType = 0;
                this.resetTexts(this.diaTexts);
                this.textId = this.rollDiaText(this.diaTexts[0], Keys.Text.batTime);
                this.SCENE.sound.play(Keys.Audio.select);
            }
            else if (JustDown(zKey)) {
                this.SCENE.sound.play(Keys.Audio.select);
                this.endingTurn = true;
                NOWCOMMAND.action(zKey);
            }
            break;
        }
    }
}
export default update;
//# sourceMappingURL=update.js.map