import type PlatForm from "./platform.js";
import type PlatFormDirector from "./platformDirector.js";

export default function update(this: PlatFormDirector) {
    const SIZE: Phaser.Scale.ScaleManager = this.scene.scale;
    for (const iterator of this.getChildren() as PlatForm[]) {
        if (iterator.x < 0 - SIZE.width ||
            iterator.x > SIZE.width * 2 ||
            iterator.y < 0 - SIZE.height ||
            iterator.y > SIZE.height * 2) {
            iterator.destroy();
            continue;
        }
        let isRiding: boolean = iterator.update();

        if (!iterator.visible && !iterator.onRender) {
            this.director.CombatzoneDirector.draws.push(iterator);
            iterator.onRender = true;
        }
    }
}