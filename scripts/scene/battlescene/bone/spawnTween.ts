import Bone from "./Bone.js";
import { BoneConfig } from "../../../Types.js";
export default function spawnTween(this: Bone, type: BoneConfig["spawnTween"]) {
    if (this.scene) {
        if (type) {
            switch (type.tween) {
                case "biggerMiddle":
                case "biggerTop":
                case "biggerBottom":
                    if (type.tween === "biggerTop") {
                        this.tweenAnchor = "top";
                    } else if (type.tween === "biggerBottom") {
                        this.tweenAnchor = "bottom";
                    }

                    const ANCHOR = this.tweenAnchor;
                    const TO: number = this.displayLength;
                    if (TO > this.top.displayHeight + this.bottom.displayHeight + 1) {

                        this.displayLength = this.top.displayHeight + this.bottom.displayHeight;

                        this.scene.tweens.add(
                            {
                                targets: this,
                                props: {
                                    displayLength: TO,
                                },
                                duration: type.duration || 1000,
                                onComplete: () => {
                                    this.state = "living";
                                    this.tweenAnchor = ANCHOR;
                                },
                                onCompleteScope: this
                            },
                        );
                    } else {
                        this.state = "living";
                    }
                    break;
            }
            switch (type.effect) {
                case "appear":
                    this.setAlpha(0);
                    this.scene.tweens.add(
                        {
                            targets: this,
                            props: {
                                alpha: 1,
                            },
                            duration: type.duration || 1000,
                            onComplete: () => {
                                this.state = "living";
                            },
                            onCompleteScope: this
                        },
                    );
                    break;
            }
            if (!type.effect && !type.tween) {
                this.state = "living";
            }
        } else {
            this.state = "living";
        }
    }
}