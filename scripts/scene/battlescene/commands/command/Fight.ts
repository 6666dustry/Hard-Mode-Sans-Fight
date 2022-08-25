import Commands from "../Commands.js";
import Keys from "../../../../keys.js";
import Director from "../../director/Director.js";
export default class Fight {
    constructor(command: Commands) {
        this.command = command;
        this.texts = ["sans"];
        const CO: Commands = this.command;
        const midP = this.command.director.CombatzoneDirector.midDialogPoint;

        [this.target, this.bar, this.slash]
            = [CO.SCENE.add.sprite(midP.x, midP.y, Keys.Image.target).setDepth(CO.depth).setVisible(false),

            CO.SCENE.add.sprite(30, midP.y, Keys.Sheet.tagBar).setDepth(CO.depth).setVisible(false),

            CO.SCENE.add.sprite(320, 100, Keys.Sheet.attacked).setDepth(CO.depth).setVisible(false)];

        this.setActives(false);
        CO.SCENE.anims.create({
            key: Keys.Anim.barFlash,
            frames: Keys.Sheet.tagBar,
            duration: 200,
            repeat: 10,
            yoyo: true
        });
        CO.SCENE.anims.create({
            key: Keys.Anim.attacking,
            frames: Keys.Sheet.attacked,
            duration: 450,
            repeat: 0,
            hideOnComplete: true,
        });
    }
    texts: string[];
    readonly command: Commands;
    target: Phaser.GameObjects.Sprite;
    bar: Phaser.GameObjects.Sprite;
    slash: Phaser.GameObjects.Sprite;
    barTween!: Phaser.Tweens.Tween;
    zEvent!: Phaser.Input.Keyboard.Key;
    startInit(): void {
        const CO: Commands = this.command;
        const X: number = CO.textsPos[0].x + 10, Y: number = CO.textsPos[0].y + 16;

        CO.diaTexts[0].setText("  * " + this.texts);

        CO.Heart.Image.setPosition(X, Y);
        this.target.setScale(0.1, 1);
    }
    setActives(isActive: boolean) {
        for (const GameObject of [this.target, this.bar, this.slash]) {
            GameObject.setActive(isActive);
        }
        if (isActive) {
            this.command.director.CombatzoneDirector.draws = this.command.director.CombatzoneDirector.draws.concat([this.target, this.bar]);
        }
    }
    action(zKey: Phaser.Input.Keyboard.Key): void {
        const CO: Commands = this.command;

        CO.resetTexts(CO.diaTexts);
        CO.resetButtons();
        this.setActives(true);
        this.slash.setVisible(false);
        this.barTween = CO.SCENE.tweens.add(
            {
                targets: this.bar,
                delay: 300,
                props: {
                    x: {
                        value: 600,
                        duration: 1300,
                    },
                },
                onComplete: this.notAttacked,
                onCompleteScope: this
            }
        );
        CO.SCENE.tweens.add({
            targets: this.target,
            delay: 0,
            duration: 300,
            scaleX: 1,
        });
        CO.Heart.Image.setVisible(false);

        this.zEvent = zKey.once("down", this.attacked.bind(this),);
    }

    getActions(): any[] {
        return this.texts;
    }
    attacked(): void {
        const CO: Commands = this.command;
        const D: Director = CO.director;
        const AT = D.AttackLoader;
        AT.attacked = true;
        if (AT.resting) {
            AT.resting = false;
            AT.phase++;
            D.Sans.setVisual({
                state: "dancing"
            });
            AT.loadFilePos = -1;
        } else {
        }
        CO.director.Sans.avoid().setCallback("onComplete", (): void => {
            this.endInit();
            this.command.SCENE.events.emit(Keys.Event.endTurn);
        }, [this], this).completeDelay = 400;
        CO.SCENE.sound.play(Keys.Audio.fight);

        this.barTween.stop();

        this.bar.anims.play(Keys.Anim.barFlash);
        this.slash.setVisible(true).anims.play(Keys.Anim.attacking);

        CO.SCENE.tweens.add({
            targets: this.slash,
            delay: 0,
            props: {
                y: {
                    value: 200,
                    duration: 400,
                    yoyo: true
                },
            },
        });
    }
    notAttacked() {
        this.barTween.stop();
        this.command.director.Sans.showDamage();
        this.zEvent.off("down", undefined, undefined, true);
        this.command.SCENE.time.delayedCall(1000, (): void => {
            this.command.SCENE.events.emit(Keys.Event.endTurn);
            this.endInit();
        }, undefined, this);
    }
    endInit(): void {
        const midP = this.command.director.CombatzoneDirector.midDialogPoint;
        this.bar.setPosition(30, midP.y).anims.stop();
        this.setActives(false);
    }
    update(): void { }
}