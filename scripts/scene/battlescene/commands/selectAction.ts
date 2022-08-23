import Commands from "./Commands.js";
import Keys from "../../../keys.js";
/**
     * used for action select
     * @param cursorKey touched key "left","right","up" or "down".
     */
export default function selectAction(this: Commands, cursorKey: string): void {
    //text pos is
    //0 1
    //2 3
    let moved: boolean = false;
    if (this.selectedCommand === 2 && this.Item.texts.length > 3) {
        switch (cursorKey) {
            case "left":
                if (this.selectAct % 2 === 0) {
                    this.Item.flip();
                }
                break;
            case "right":
                if (this.selectAct % 2 === 1) {
                    this.Item.flip();
                }
                break;
        }
    }
    this.howManyActions();
    switch (cursorKey) {
        case "left":
        case "right":
            if (this.selectAct % 2 === 0) {
                if (this.pageAction[this.selectAct + 1]) {
                    this.selectAct++;
                    moved = true;
                }
                break;
            }
            if (this.selectAct % 2 === 1) {
                if (this.pageAction[this.selectAct - 1]) {
                    this.selectAct--;
                    moved = true;
                }
                break;
            }
            break;
        case "up":
        case "down":
            if (this.selectAct <= 1) {
                if (this.pageAction[this.selectAct + 2]) {
                    this.selectAct += 2;
                    moved = true;
                }
                break;
            }
            if (this.selectAct >= 2) {
                if (this.pageAction[this.selectAct - 2]) {
                    this.selectAct -= 2;
                    moved = true;
                }
                break;
            }
            break;
    }
    if (!moved) {
        this.selectAct = 0;
    } else {
        this.SCENE.sound.play(Keys.Audio.cursor);
    }
}