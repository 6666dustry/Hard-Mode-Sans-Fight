function boneRemove() {
    if (this.scene) {
        this.removeAll(true);
        this.destroy();
    }
}
export default function deleteTween(type) {
    if (this.scene) {
        if (type) {
            switch (type.tween) {
                case "smallerMiddle":
                case "smallerTop":
                case "smallerBottom":
                    if (type.tween === "smallerTop") {
                        this.tweenAnchor = "top";
                    }
                    else if (type.tween === "smallerBottom") {
                        this.tweenAnchor = "bottom";
                    }
                    this.state = "dying";
                    this.scene.tweens.add({
                        targets: this,
                        props: {
                            displayLength: this.top.displayHeight + this.bottom.displayHeight,
                        },
                        duration: type.duration || 1000,
                        onComplete: boneRemove,
                        onCompleteScope: this
                    });
                    break;
            }
            switch (type.effect) {
                case "disappear":
                    this.state = "dying";
                    this.scene.tweens.add({
                        targets: this,
                        props: {
                            alpha: 0,
                        },
                        duration: type.duration || 1000,
                        onComplete: boneRemove,
                        onCompleteScope: this
                    });
                    break;
            }
            if (!type.effect && !type.tween) {
                boneRemove.call(this);
            }
        }
        else {
            boneRemove.call(this);
        }
    }
}
//# sourceMappingURL=deleteTween.js.map