import Keys from "../../../keys.js";
function debugUpdate(time, fps) {
    if (this.state !== "running") {
        return;
    }
    const AT = this.scene.director.AttackLoader;
    if (this.active) {
        if (AT.SingleAttack) {
            this.showParameter.setText(`
time:${time}
fps:${fps}
load file: ${AT.attackName}
attack: 
    where: ${AT.runAttackPos}
    category: ${AT.SingleAttack.category}
    type: ${AT.SingleAttack.type}
    wait: ${AT.SingleAttack.wait}
turn: ${AT.loadFilePos} 
phase: ${AT.phase}
attacked: ${AT.attacked}
colliding: ${this.scene.director.Heart.colliding}
canJump: ${this.scene.director.Heart.canJump}
single: ${!!AT.playSingle}
moving: ${this.director.Heart.moving}
pressKey: ${this.scene.cursors.getDownKey()} `);
        }
    }
    if (Phaser.Input.Keyboard.JustDown(this.scene.tKey)) {
        this.showParameter.text += "\npaused";
        this.scene.scene.pause(Keys.Scene.battleScene);
        this.scene.scene.launch(Keys.Scene.pause);
    }
    if (Phaser.Input.Keyboard.JustDown(this.scene.hKey)) {
        this.director.Statuses.healHp({
            amount: 99,
            debug: true
        });
    }
}
export default debugUpdate;
//# sourceMappingURL=debugUpdate.js.map