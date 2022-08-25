/**
 * @package menu boe configs.
 */
/**
 * spawn bone at left up select position.
 * @param this
 */
export function menuBone1() {
    this.BoneDirector.addSingle({
        x: -20,
        y: this.Commands.textsPos[0].y,
        visible: true,
        length: 30,
        tween: {
            targets: this,
            props: {
                x: this.Commands.textsPos[0].x + 30
            },
            duration: 800,
            repeat: -1,
            yoyo: true,
            ease: "Quad.easeOut"
        }
    }, "menu");
}
/**
 * spawn bone at command buttons.
 * @param this
 */
export function menuBone2() {
    let delay = 0;
    for (const iterator of this.Commands.buttonPos) {
        this.BoneDirector.addMulti({
            x: iterator.x + 60,
            y: 670,
            visible: true,
            length: 30,
            delay: 1000,
            count: -1,
            startAt: delay,
            tween: {
                targets: this,
                props: {
                    x: {
                        value: iterator.x - 60,
                        duration: 1000
                    },
                    y: {
                        value: iterator.y,
                        hold: 600,
                        duration: 200,
                        yoyo: true
                    },
                },
                ease: "Sine.easeInOut"
            }
        }, "menu");
        delay > 0 ? (delay = 0) : (delay = 500);
    }
}
//# sourceMappingURL=menuBones.js.map