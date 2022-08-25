import makeDeepCopy from "./makeDeepCopy.js";
import step from "./step.js";
export default function addMulti(data, type) {
    let copyData = makeDeepCopy(data);
    copyData.count = copyData.count || 5;
    copyData.delay = copyData.delay || 0;
    if (copyData.delay && copyData.delay > 0) {
        this.repeats.push(this.scene.time.addEvent({
            callback: () => {
                this.addSingle(copyData, type, {
                    step: true,
                    delay: true,
                    count: true,
                    startAt: true
                });
                if (copyData.step) {
                    step(copyData, copyData.step);
                }
            },
            callbackScope: this,
            args: [],
            repeat: copyData.count,
            delay: copyData.delay,
            startAt: copyData.startAt,
        }));
    }
    else {
        for (let index = 0; index < copyData.count; index++) {
            this.addSingle(copyData, type, {
                step: true,
                delay: true,
                count: true,
                startAt: true
            });
            if (copyData.step) {
                step(copyData, copyData.step);
            }
        }
    }
}
//# sourceMappingURL=addMulti.js.map